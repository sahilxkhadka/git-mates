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
		response.cookies.delete("refresh_token");
		response.cookies.delete("access_token");
		return response;
	}
}
