import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Data } from "./definitions";

export const getFollwersList = async (userName: string) => {
	console.log("🚀 ~ getFollwersList ~ userName:", userName);
	revalidateTag("followers");
	noStore();
	const res = await fetch(
		`https://api.github.com/users/${userName}/followers?per_page=1000000`,
		{
			next: { tags: ["followers"] },
			headers: {
				Authorization: "Bearer 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",
			},
		}
	);
	console.log(res.status);
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
				Authorization: "Bearer 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",
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
