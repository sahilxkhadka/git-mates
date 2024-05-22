import Image from "next/image";

import GithubButton from "@/components/github-btn";
import superOctacat from "../../public/super-octacat.png";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Git Mates",
	description: "Git Your Gang Right, Keep Your Code Connections True!",
};

export default async function Home() {
	return (
		<div className='flex-1'>
			<div className='flex gap-4 mb-5 flex-wrap justify-center'>
				<GithubButton
					variant='github'
					link='https://github.com/sahilxkhadka'
					mainText='FOLLOW ME'
					hoverText='@sahilxkhadka'
				/>
				<GithubButton
					variant='star'
					link='https://github.com/sahilxkhadka/git-mates'
					mainText='STAR REPO'
					hoverText='Git Mates'
				/>
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
