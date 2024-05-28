import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const nextUrl = request.nextUrl;
	if (nextUrl.pathname === "/overview") {
		console.log("mimo")
	}
}
