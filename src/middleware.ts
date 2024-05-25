import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const nextUrl = request.nextUrl;
	if (nextUrl.pathname === "/login") {
		const refresh_token = nextUrl.searchParams.get("refresh_token");
		const expiry = nextUrl.searchParams.get("refresh_token_expires_in");
		console.log("🚀 ~ middleware ~ expiry:", expiry);
		const expiryDate = new Date(Date.now() + parseInt(expiry ?? "0"));
		console.log("🚀 ~ middleware ~ expiryDate:", expiryDate);
		if (refresh_token) {
			const response = NextResponse.next();
			response.cookies.set({
				name: "refresh_token",
				value: refresh_token,
				maxAge: parseInt(expiry ?? ""),
				expires: new Date(Date.now() + parseInt(expiry ?? "0")),
			});
			return response;
		}
	}
}
