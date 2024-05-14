import { getFollowingList, getFollwersList } from "@/lib/actions";
import { Tabs } from "@/lib/definitions";
import { filterFollowedUsers, filterImposters } from "@/lib/utils";
import ListItem from "./list-item";
import { avatarOutlineColors } from "@/lib/constants";

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
	const outlineColor = avatarOutlineColors[activeTab];
	return (
		<div>
			<div className='my-5 flex flex-col items-center gap-5 px-1.5'>
				<p className='capitalize text-sm sm:text-base font-medium'>
					<span
						className='font-semibold px-3 py-1.5 mr-1 rounded'
						style={{ backgroundColor: outlineColor }}
					>
						{listItems.length}
					</span>
					<span className='capitalize inline-block'>{activeTab}</span>
				</p>
				{listItems.map((item) => (
					<ListItem key={item.login} userInfo={item} activeTab={activeTab} />
				))}
			</div>
		</div>
	);
}
