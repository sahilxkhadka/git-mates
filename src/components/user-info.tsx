import { getUserDetails } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export default async function UserInfo() {
	const userDetails = await getUserDetails();
	const { avatar_url, name, html_url, login } = userDetails;
	return (
		<div className='flex items-center w-72 justify-between gap-2'>
			<Link href={html_url}>
				<Image
					src={avatar_url}
					height={40}
					width={40}
					alt={name || login}
					className='rounded-full'
				/>
			</Link>
			<div className='flex-1 truncate mr-5'>
				<p className='font-medium'>{name || login}</p>
			</div>
			<Link
				href={"/logout"}
				className='bg-red-950 text-red-400 border flex justify-center items-center border-red-400 border-b-4 font-medium overflow-hidden relative px-4 h-full rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
			>
				<span className='bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
				Logout
			</Link>
		</div>
	);
}
