"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Data } from "./definitions";
import { cookies } from "next/headers";

export const getFollwersList = async (userName: string) => {
	revalidateTag("followers");
	noStore();
	const res = await fetch(
		`https://api.github.com/users/${userName}/followers?per_page=1000000`,
		{
			next: { tags: ["followers"] },
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			},
		}
	);
	if (res.status === 404) {
		notFound();
	}
	const data: Data[] = await res.json();
	return data;
};

export const getFollowingList = async (userName: string) => {
	revalidateTag("following");
	noStore();
	const res = await fetch(
		`https://api.github.com/users/${userName}/following?per_page=1000000`,
		{
			next: { tags: ["following"] },
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			},
		}
	);
	if (res.status === 404) {
		notFound();
	}
	const data: Data[] = await res.json();
	return data;
};

export const getDetailsForUser = async (
	prevState: { error: string },
	data: FormData
) => {
	const userName = (data.get("userName") as string) ?? "";

	if (userName.trim().length === 0) {
		return { error: "UserName is required" };
	}
	redirect(`?userName=${userName}&tab=imposters`);
};

export const redirectToHome = async () => {
	// revalidatePath("");
	redirect("/");
};

export const getAuthFollowersList = async () => {
	noStore();
	// const accessToken = cookies().get("githubCode")?.value;
	// console.log("🚀 ~ getAuthFollowersList ~ accessToken:", accessToken);
	// const res = await fetch("https://api.github.com/user/followers", {
	// 	headers: {
	// 		Authorization: `Bearer ${accessToken}`,
	// 		Accept: "application/vnd.github+json",
	// 		"X-GitHub-Api-Version": "2022-11-28",
	// 	},
	// });
	// console.log("status: ", res.status);
	// const data = await res.json();
	// console.log("authenticated user ko followers", data);
	// return data;

	const githubCode = cookies().get("githubCode")?.value;
	console.log("🚀 ~ getAuthFollowersList ~ githubCode:", githubCode);

	const getAccessToken = await fetch(
		`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${githubCode}`,
		{ method: "POST" }
	);
	// console.log(getAccessToken);

	const accessTokenResponse = await getAccessToken.text();
	console.log("yo chai access token ko response haii ", accessTokenResponse);
};

export async function getAccessToken(code: string) {
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
		redirect(`/login?${resultParameters}`);
	}
	throw new Error("Error from github");
}
