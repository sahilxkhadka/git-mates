import { getFollowingList, getFollwersList } from "@/lib/actions";

interface Props {
	userName: string;
}

export default async function OverView({ userName }: Props) {
	const followersData = getFollwersList(userName);
	const followingData = getFollowingList(userName);

	const [followersList, followingList] = await Promise.all([
		followersData,
		followingData,
	]);
	console.log("🚀 ~ OverView ~ followersList:", followersList);
	console.log("🚀 ~ OverView ~ followingList:", followingList);
	return <div>OverView</div>;
}
