"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Data } from "./definitions";

export const getAccessToken = async () => {
	const cookieAccessToken = cookies().get("access_token")?.value;

	if (cookieAccessToken) {
		return cookieAccessToken;
	}
	const refreshToken = cookies().get("refresh_token")?.value;
	const req = await fetch(
		`https://git-mates.vercel.app/api/github/token?refresh_token=${refreshToken}`
	);
	const accessTokenData = await req.json();

	const accessToken = accessTokenData.accessToken;

	return accessToken;
};

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

export const manageFollowers = async (userName: string, followed: boolean) => {
	"use server";
	const accessToken = await getAccessToken();

	if (followed) {
		const res = await fetch(
			`https://api.github.com/user/following/${userName}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: "application/vnd.github+json",
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}
		);
		console.log("status: ", res.status);

		if (res.status === 403) {
			cookies().delete({
				name: "refresh_token",
				domain: "git-mates.vercel.app",
				secure: true,
			});
			cookies().delete({
				name: "access_token",
				domain: "git-mates.vercel.app",
				secure: true,
			});
			redirect("https://github.com/apps/git-mates/installations/new");
		}
	} else {
		const res = await fetch(
			`https://api.github.com/user/following/${userName}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: "application/vnd.github+json",
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}
		);
		console.log("status: ", res.status);
		if (res.status === 403) {
			cookies().delete({
				name: "refresh_token",
				domain: "git-mates.vercel.app",
				secure: true,
			});
			cookies().delete({
				name: "access_token",
				domain: "git-mates.vercel.app",
				secure: true,
			});
			redirect("https://github.com/apps/git-mates/installations/new");
		}
	}
	revalidateTag("following");
	revalidateTag("followers");
};

export const getUserDetails = async () => {
	const accessToken = await getAccessToken();

	const res = await fetch(`https://api.github.com/user`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
	console.log("status: ", res.status);

	const data: Data = await res.json();
	console.log("🚀 ~ getUserDetails ~ data:", data);
	return data;
};
