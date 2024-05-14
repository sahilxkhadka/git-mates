import { redirect } from "next/navigation";
import { Data } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export const getFollwersList = async (userName: string) => {
	noStore();
	const res = await fetch(
		`https://api.github.com/users/${userName}/followers?per_page=1000000`,
		{
			headers: {
				Authorization: "Bearer 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",
			},
		}
	);
	const data: Data[] = await res.json();
	return data;
};

export const getFollowingList = async (userName: string) => {
	noStore();
	const res = await fetch(
		`https://api.github.com/users/${userName}/following?per_page=1000000`,
		{
			headers: {
				Authorization: "Bearer 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",
			},
		}
	);
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
	redirect(`?userName=${userName}`);
};
