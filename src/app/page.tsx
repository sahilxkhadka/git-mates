import OverView from "@/components/overview";
import UserForm from "@/components/user-form";
import Image from "next/image";
import { Suspense } from "react";

import githubOctacat from "../../public/github-octacat.svg";
import superOctacat from "../../public/super-octacat.png";
import { tabs } from "@/lib/constants";
import Link from "next/link";

interface Props {
	searchParams?: {
		userName: string;
		tab?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const userName = searchParams?.userName;
	const activeTab = searchParams?.tab || "";
	return (
		<main className='flex min-h-screen flex-col items-center gap-4 p-8'>
			<Image src={githubOctacat} alt='Github Logo' />
			<UserForm />
			{userName ? (
				<Suspense fallback={<h1>Loadign....</h1>}>
					<OverView userName={userName} />
				</Suspense>
			) : (
				<div className='flex-1'>
					<Image
						src={superOctacat}
						alt='Octacat gif'
						className='max-h-full object-contain'
					/>
				</div>
			)}
			<div className='flex'>
				{tabs.map((tabItem) => (
					<Link
						key={tabItem}
						href={{
							query: { ...searchParams, tab: tabItem },
						}}
						className={`px-6 pb-1 capitalize transition-all ${
							activeTab === tabItem &&
							"text-blue-500 border-b border-blue-500 font-medium"
						}`}
					>
						{tabItem}
					</Link>
				))}
			</div>
		</main>
	);
}
