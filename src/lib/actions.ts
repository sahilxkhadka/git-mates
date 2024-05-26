import { unstable_noStore as noStore } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Data } from "./definitions";

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
