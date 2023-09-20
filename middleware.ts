import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  console.log("MIDDLEWARE Session", !!session);
  if (!session) {
    console.log("MIDDLEWARE login redirect !session");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const responseAPI = await fetch(`${process.env.BASE_URL}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    console.log("MIDDLEWARE login redirect !200");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("MIDDLEWARE");
  return NextResponse.next();
}

export const config = {
  matcher: ["/overview/:path*", "/quizzes/:path*", "/questions/:path*"],
};
