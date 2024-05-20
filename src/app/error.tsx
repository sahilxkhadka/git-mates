"use client"; // Error components must be Client Components

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import emptyOctacat from "../../public/empty-octacat.png";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	const handleClick = async () => {
		// reset();
		router.back();
	};

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error, router]);

	return (
		<div>
			<h2 className='text-center'>Something went wrong!</h2>
			<div className='my-5'>
				<Image src={emptyOctacat} alt='empty state image' placeholder='blur' />
			</div>
			<h2>Try Searching for another user.</h2>
			<button
				onClick={() => {
					// router.replace("/");
					reset();
				}}
			>
				Retry
			</button>
		</div>
	);
}
