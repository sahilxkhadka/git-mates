import { redirectToHome } from "@/lib/actions";
import Link from "next/link";
import emptyOctacat from "../../public/empty-octacat.png";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className='flex h-full flex-col items-center justify-center gap-2'>
			<Image src={emptyOctacat} alt='empty state image' placeholder='blur' />
			<h2 className='text-xl font-semibold'>404 Not Found</h2>
			<p>Could not find the requested invoice.</p>
			<Link
				href={"/"}
				className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
				type='submit'
			>
				Go Back
			</Link>
		</div>
	);
}
