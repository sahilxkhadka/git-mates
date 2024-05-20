"use sever";

import Image from "next/image";

import GithubButton from "@/components/github-btn";
import superOctacat from "../../public/super-octacat.png";

export default async function Home() {
	return (
		<div className='flex-1'>
			<div className='flex gap-4 mb-5 flex-wrap justify-center'>
				<GithubButton />
				<GithubButton />
			</div>
			<Image
				src={superOctacat}
				alt='Octacat'
				placeholder='blur'
				className='max-h-full object-contain'
			/>
		</div>
	);
}
