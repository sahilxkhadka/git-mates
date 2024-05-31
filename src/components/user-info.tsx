import { getUserDetails } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "./logout-btn.";

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
			<LogoutBtn />
		</div>
	);
}
