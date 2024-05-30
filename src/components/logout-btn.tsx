import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LogoutBtn() {
	async function handleLogout(formData: FormData) {
		"use server";
		cookies().delete("refresh_token");
		console.log("logout garyo");
		redirect("/");
	}

	return (
		<Link
			href={"/logout"}
			className='bg-red-950 inline text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
		>
			<span className='bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
			Logout
		</Link>
	);
}
