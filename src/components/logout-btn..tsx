"use client";

import { handleLogout } from "@/lib/actions";

export default function LogoutBtn() {
	return (
		<button
			onClick={async () => {
				await handleLogout();
			}}
			className='bg-red-950 text-red-400 border flex justify-center items-center border-red-400 border-b-4 font-medium overflow-hidden relative px-4 h-full rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
		>
			<span className='bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
			Logout
		</button>
	);
}
