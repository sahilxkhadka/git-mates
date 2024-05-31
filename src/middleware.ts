import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const nextUrl = request.nextUrl;
	if (nextUrl.pathname === "/overview") {
		const refreshToken = cookies().get("refresh_token")?.value;
		if (refreshToken === undefined) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (nextUrl.pathname === "/logout") {
		const response = NextResponse.redirect(new URL("/", request.url));
		response.cookies.delete({
			name: "refresh_token",
			domain: "git-mates.vercel.app",
			secure: true,
		});
		response.cookies.delete({
			name: "access_token",
			domain: "git-mates.vercel.app",
			secure: true,
		});
		return response;
	}
}
