"use server";

import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Data } from "./definitions";
import { cookies } from "next/headers";

export const getFollwersList = async (accessToken: string) => {
	console.log("🚀 ~ getFollwersList ~ accessToken:", accessToken);
	// noStore();

	const res = await fetch(
		`https://api.github.com/user/followers?per_page=100000`,
		{
			next: { tags: ["followers"] },
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);
	console.log("res: ", res.status);
	if (res.status === 404) {
		notFound();
	}
	const data: Data[] = await res.json();
	console.log("🚀 ~ getFollwersList ~ data:", data);
	return data;
};

export const getFollowingList = async (accessToken: string) => {
	// noStore();

	const res = await fetch(
		`https://api.github.com/user/following?per_page=100000`,
		{
			next: { tags: ["following"] },
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
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

export const unfollowUser = async (userName: string) => {
	console.log("🚀 ~ unfollowUser ~ userName:", userName);
	("use server");
	const refreshToken = cookies().get("refresh_token")?.value;
	const req = await fetch(
		`http://localhost:3000/api/login/github/token?refresh_token=${refreshToken}`
	);
	const accessTokenData = await req.json();

	const accessToken = accessTokenData.accessToken;
	console.log("🚀 ~ unfollowUser ~ accessToken:", accessToken);

	const res = await fetch(`https://api.github.com/user/following/${userName}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
	console.log("status: ", res.status);
	const data = await res.json();
	console.log("🚀 ~ unfollowUser ~ data:", data);

	revalidateTag("following");
};
