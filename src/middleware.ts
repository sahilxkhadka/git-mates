import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const nextUrl = request.nextUrl;
	if (nextUrl.pathname === "/overview") {
		const refreshToken = cookies().get("refresh_token")?.value;
		if(refreshToken === undefined){
			return NextResponse.redirect(new URL('/', request.url));
		}
		
	}
}
