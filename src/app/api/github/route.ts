import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	console.log("all Search params", searchParams);

	const code = searchParams.get("code");
	const res = await fetch(
		`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
		{
			method: "POST",
		}
	);
	if (res.status === 200) {
		const data = await res.text();
		console.log("🚀 ~ getAccessToken ~ data:", data);

		const resultParameters = new URLSearchParams(data);
		const refreshToken = resultParameters.get("refresh_token") ?? "";
		console.log("🚀 ~ GET ~ refreshToken:", refreshToken);
		const expiry = parseInt(
			resultParameters.get("refresh_token_expires_in") ?? "0"
		);

		cookies().set({
			name: "refresh_token",
			value: refreshToken,
			maxAge: expiry,
			expires: new Date(Date.now() + expiry),
		});

		// const getUserInfo =

		const accessToken = resultParameters.get("access_token") ?? "";
		const accessTokenExpiry = parseInt(
			resultParameters.get("expires_in") ?? "0"
		);

		cookies().set({
			name: "access_token",
			value: accessToken,
			maxAge: accessTokenExpiry,
			expires: new Date(Date.now() + accessTokenExpiry),
		});

		redirect("/overview");
	} else {
		return new Response("Error from github", {
			status: res.status,
		});
	}
}
