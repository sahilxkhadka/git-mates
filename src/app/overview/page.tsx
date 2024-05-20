import { getFollowingList, getFollwersList } from "@/lib/actions";
import { Tabs } from "@/lib/definitions";
import { filterFollowedUsers, filterImposters } from "@/lib/utils";
import ListItem from "@/components/list-item";
import { avatarOutlineColors, tabs } from "@/lib/constants";
import Image from "next/image";
import emptyStateImage from "../../../public/empty-octacat.png";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
	searchParams?: {
		userName?: string;
		tab?: Tabs;
	};
}

export default async function Page({ searchParams }: Props) {
	const userName = searchParams?.userName || "";
	const activeTab = searchParams?.tab || "imposters";
	const followersData = getFollwersList(userName);
	const followingData = getFollowingList(userName);

	const [followers, following] = await Promise.all([
		followersData,
		followingData,
	]);
	const imposters = filterImposters(followers, following);
	const updatedFollowersList = filterFollowedUsers(followers, following);

	const overallList = {
		imposters,
		followers: updatedFollowersList,
		following,
	};
	const listItems = overallList[activeTab];
	const outlineColor = avatarOutlineColors[activeTab];
	return (
		<div className='overflow-auto w-96 sm:overflow-hidden hover:overflow-auto flex-1 scrollbar-gutter'>
			<div className='flex justify-center sticky top-0 bg-black z-50 shadow-sm shadow-blue-500'>
				{tabs.map((tabItem) => (
					<Link
						key={tabItem}
						href={{
							query: { ...searchParams, tab: tabItem },
						}}
						className={`px-6 pb-1 capitalize transition-all border-b-2  ${
							activeTab === tabItem
								? "text-blue-500  border-blue-500 font-medium"
								: "border-transparent"
						}`}
					>
						{tabItem}
					</Link>
				))}
			</div>
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
				{listItems.length > 0 ? (
					listItems.map((item) => (
						<ListItem key={item.login} userInfo={item} activeTab={activeTab} />
					))
				) : (
					<Image
						src={emptyStateImage}
						alt='empty state image'
						placeholder='blur'
					/>
				)}
			</div>
		</div>
	);
}
