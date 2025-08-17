import { type NextRequest, NextResponse } from "next/server";
import { getUserFromSession, updateUserSessionExpiration } from "./auth/core/session";

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest){
  const response = await middlewareAuth(request) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({...options, name: key, value});
    },
    get: key => request.cookies.get(key)
  })

  return response;
}

async function middlewareAuth(request: NextRequest){
  if (privateRoutes.includes(request.nextUrl.pathname)){
    const user = await getUserFromSession(request.cookies);
    if (!user){
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (adminRoutes.includes(request.nextUrl.pathname)){
    const user = await getUserFromSession(request.cookies);
    if (!user){
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

