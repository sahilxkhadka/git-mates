"use client"; // Error components must be Client Components

import { useEffect } from "react";
import emptyOctacat from "../../public/empty-octacat.png";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	const handleClick = async () => {
		router.replace("/");
	};

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2 className='text-center'>Something went wrong!</h2>
			<div className='my-5'>
				<Image src={emptyOctacat} alt='empty state image' placeholder='blur' />
			</div>
			<h2>Try Searching for another user.</h2>
			<button onClick={handleClick}>Click Me</button>
			<Link href={"/"}>Return Home</Link>
		</div>
	);
}
