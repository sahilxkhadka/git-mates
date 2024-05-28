"use client";

import { manageFollowers } from "@/lib/actions";

interface Props {
	followed: boolean;
	userName: string;
}

export default function ActionsForm({ followed, userName }: Props) {
	return (
		<button
			onClick={async () => {
				await manageFollowers(userName, followed);
			}}
			type='submit'
			className={`text-sm w-24 text-center border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group ${
				followed
					? "bg-red-950 text-red-500 border-red-500"
					: "bg-green-950 text-green-400 border-green-400"
			}`}
		>
			<span
				className={`bg-red-500 shadow-red-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.6)] ${
					followed
						? "bg-red-500 shadow-red-500"
						: "bg-green-400 shadow-green-400"
				}`}
			></span>
			{followed ? "Unfollow" : "Follow"}
		</button>
	);
}
