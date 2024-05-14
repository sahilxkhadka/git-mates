import OverView from "@/components/overview";
import UserForm from "@/components/user-form";
import Image from "next/image";
import { Suspense } from "react";

import githubOctacat from "../../public/github-octacat.svg";
import superOctacat from "../../public/super-octacat.png";
import { tabs } from "@/lib/constants";
import Link from "next/link";
import { Tabs } from "@/lib/definitions";
import ItemsLoader from "@/components/items-loader";

interface Props {
	searchParams?: {
		userName?: string;
		tab?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const userName = searchParams?.userName;
	const activeTab = (searchParams?.tab || "imposters") as Tabs;
	return (
		<main className='flex min-h-screen flex-col items-center gap-8 p-8'>
			<Image src={githubOctacat} alt='Github Logo' />
			<UserForm />
			{userName ? (
				<div className='w-min'>
					<div className='flex justify-center'>
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
					<Suspense fallback={<ItemsLoader />}>
						<OverView userName={userName} activeTab={activeTab} />
					</Suspense>
				</div>
			) : (
				<div className='flex-1'>
					<Image
						src={superOctacat}
						alt='Octacat gif'
						className='max-h-full object-contain'
					/>
				</div>
			)}
		</main>
	);
}
