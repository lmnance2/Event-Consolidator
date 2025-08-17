import { NextResponse } from "next/server";
import crypto from "crypto";
import { redisClient } from "@/redis/redis";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");
  await redisClient.set(`oauth_state${state}`, "1", { ex: 60 * 5});

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
    state
  });

  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return NextResponse.redirect(authURL);
}