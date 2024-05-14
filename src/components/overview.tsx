import { getFollowingList, getFollwersList } from "@/lib/actions";
import { Tabs } from "@/lib/definitions";
import { filterFollowedUsers, filterImposters } from "@/lib/utils";
import ListItem from "./list-item";

interface Props {
	userName: string;
	activeTab: Tabs;
}

export default async function OverView({ userName, activeTab }: Props) {
	const followersData = getFollwersList(userName);
	const followingData = getFollowingList(userName);

	const [followers, following] = await Promise.all([
		followersData,
		followingData,
	]);
	const imposters = filterImposters(followers, following);
	// console.log("🚀 ~ OverView ~ followingList:", followingList);
	const updatedFollowersList = filterFollowedUsers(followers, following);

	const overallList = {
		imposters,
		followers: updatedFollowersList,
		following,
	};
	const listItems = overallList[activeTab];
	return (
		<div>
			<div className='my-5 flex flex-col items-center gap-5 px-1.5'>
				{listItems.map((item) => (
					<ListItem key={item.login} userInfo={item} activeTab={activeTab} />
				))}
			</div>
		</div>
	);
}
