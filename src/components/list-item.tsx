import { avatarRingColors } from "@/lib/constants";
import { Data, Tabs } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

interface Props {
	userInfo: Data;
	activeTab: Tabs;
}

export default function ListItem({ userInfo, activeTab }: Props) {
	const { login, avatar_url, html_url } = userInfo;
	const ringColor = avatarRingColors[activeTab];
	return (
		<div className='w-full flex gap-4 items-center'>
			<Image
				src={avatar_url}
				alt={login}
				width={50}
				height={50}
				className={`object-cover rounded-full ring-4 ${ringColor}`}
			/>
			<div className='flex-1 truncate'>{login}</div>
			<Link
				href={html_url}
				target='_blank'
				className='text-sm bg-green-950 text-red-500 border border-red-500 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
			>
				<span className='bg-red-500 shadow-red-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.6)]'></span>
				Unfollow
			</Link>
		</div>
	);
}
