import { Data } from "./definitions";

export const getFollwersList = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/followers`);
	const data: Data = await res.json();
	return data;
};

export const getFollowingList = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/following`);
	const data: Data = await res.json();
	return data;
};

export const getDetailsForUser = async (
	prevState: { userName: string },
	data: FormData
) => {
	const userName = (data.get("userName") as string) ?? "";

	const followersData = getFollwersList(userName);
	const followingData = getFollowingList(userName);
	const [followersList, followingList] = await Promise.all([
		followersData,
		followingData,
	]);
	console.log("🚀 ~ followersList:", followersList);
	console.log("🚀 ~ followingList:", followingList);

	return { userName };
};
