import { redirectToHome } from "@/lib/actions";
import Link from "next/link";
import emptyOctacat from "../../../public/empty-octacat.png";
import Image from "next/image";
import { revalidateTag } from "next/cache";

export default function NotFound() {
	return (
		<div className='flex h-full flex-col items-center justify-center gap-3'>
			<Image src={emptyOctacat} alt='empty state image' placeholder='blur' />
			<h2 className='text-xl font-semibold'>404 Not Found</h2>
			<p>Could not find the requested user.</p>
			<Link
				href={"/"}
				className='bg-blue-650 text-blue-300 border border-blue-500 border-b-4 font-medium overflow-hidden relative px-6 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'
			>
				<span className='bg-blue-500 shadow-blue-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
				Go Back
			</Link>
		</div>
	);
}
