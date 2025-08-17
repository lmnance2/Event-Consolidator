import { NextResponse } from "next/server";
import { redisClient } from "@/redis/redis";
import prisma from "@/lib/db";
import { createUserSession } from "@/auth/core/session";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const redirect = (path: string) => NextResponse.redirect(new URL(path, req.url));

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    // --- Step 1: Handle Google OAuth errors ---
    if (error) {
      console.error("[OAuth Error] Google returned:", error);
      return redirect("/login?error=oauth_error");
    }

    // --- Step 2: Validate required params ---
    if (!code || !state) {
      console.error("[OAuth Error] Missing code or state:", { code, state });
      return redirect("/login?error=missing_code_or_state");
    }

    // --- Step 3: Verify OAuth state in Redis ---
    const stateKey = `oauth_state${state}`;
    try {
      const ok = await redisClient.get(stateKey);
      if (!ok) {
        console.error("[OAuth Error] Invalid or expired state:", state);
        return redirect("/login?error=invalid_state");
      }
      await redisClient.del(stateKey);
    } catch (redisErr) {
      console.error("[Redis Error] State verification failed:", redisErr);
      return redirect("/login?error=redis_failure");
    }

    // --- Step 4: Exchange code for tokens ---
    let tokenJson;
    try {
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
          grant_type: "authorization_code",
        }),
      });

      if (!tokenRes.ok) {
        console.error("[OAuth Error] Token exchange failed:", await tokenRes.text());
        return redirect("/login?error=token_exchange_failed");
      }
      tokenJson = await tokenRes.json();
    } catch (tokenErr) {
      console.error("[OAuth Error] Token exchange threw error:", tokenErr);
      return redirect("/login?error=token_exchange_failed");
    }

    // --- Step 5: Fetch Google profile ---
    let profile;
    try {
      const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      });

      if (!profileRes.ok) {
        console.error("[OAuth Error] Profile fetch failed:", await profileRes.text());
        return redirect("/login?error=profile_fetch_failed");
      }
      profile = await profileRes.json();
    } catch (profileErr) {
      console.error("[OAuth Error] Profile fetch threw error:", profileErr);
      return redirect("/login?error=profile_fetch_failed");
    }

    const email: string | undefined = profile.email;
    if (!email) {
      console.error("[OAuth Error] No email found in profile:", profile);
      return redirect("/login?error=no_email");
    }

    // --- Step 6: Find user in DB ---
    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (dbErr) {
      console.error("[DB Error] Failed to query user:", dbErr);
      return redirect("/login?error=db_error");
    }

    if (!user) {
      console.error("[OAuth Error] No account for email:", email);
      return redirect("/login?error=no_account_for_email");
    }

    // --- Step 7: Create session cookie ---
    try {
      const cookieStore = await cookies();
      await createUserSession(user, cookieStore);
    } catch (sessionErr) {
      console.error("[Session Error] Failed to create session:", sessionErr);
      return redirect("/login?error=cookie_not_created");
    }

    // --- Step 8: Redirect to dashboard ---
    return redirect("/dashboard");

  } catch (err) {
    console.error("[Server Error] Unexpected failure:", err);
    return redirect("/login?error=server_error");
  }
}
