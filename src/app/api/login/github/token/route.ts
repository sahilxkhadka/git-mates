import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const refreshToken = searchParams.get("refresh_token");

	const res = await fetch(
		`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`,
		{ method: "POST" }
	);

	const data = await res.text();
	console.log("🚀 ~ Page ~ data:", data);
	const dataParams = new URLSearchParams(data);
	const newToken = dataParams.get("refresh_token") ?? "";
	const expiry = parseInt(dataParams.get("refresh_token_expires_in") ?? "0");

	cookies().set({
		name: "refresh_token",
		value: newToken,
		maxAge: expiry,
		expires: new Date(Date.now() + expiry),
	});

	const accessToken = dataParams.get("access_token");

	return Response.json({ accessToken });
}
