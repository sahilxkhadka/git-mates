import { avatarOutlineColors } from "@/lib/constants";
import { Data, Tabs } from "@/lib/definitions";
import Image from "next/image";
import ActionsBtn from "./actions-btn";

interface Props {
	userInfo: Data;
	activeTab: Tabs;
}

export default async function ListItem({ userInfo, activeTab }: Props) {
	const { login, avatar_url, html_url, hasFollowed } = userInfo;
	const outlineColor = avatarOutlineColors[activeTab];

	const followed = hasFollowed === true || hasFollowed === undefined;

	return (
		<div className='w-full flex gap-4 items-center '>
			<Image
				src={avatar_url}
				alt={login}
				width={50}
				height={50}
				className={`object-cover rounded-full outline outline-[3px]`}
				style={{
					outlineColor,
				}}
			/>
			<div className='flex-1 truncate'>{login}</div>
			<ActionsBtn followed={followed} userName={login} />
		</div>
	);
}
