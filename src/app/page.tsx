import OverView from "@/components/overview";
import Image from "next/image";
import { Suspense } from "react";

import ItemsLoader from "@/components/items-loader";
import { tabs } from "@/lib/constants";
import { Tabs } from "@/lib/definitions";
import Link from "next/link";
import superOctacat from "../../public/super-octacat.png";

interface Props {
	searchParams?: {
		userName?: string;
		tab?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const userName = searchParams?.userName;

	const activeTab = (searchParams?.tab || "imposters") as Tabs;
	return userName ? (
		<div className='overflow-auto w-96 sm:overflow-hidden hover:overflow-auto flex-1 scrollbar-gutter'>
			<div className='flex justify-center sticky top-0 bg-black z-50 shadow-sm shadow-blue-500'>
				{tabs.map((tabItem) => (
					<Link
						key={tabItem}
						href={{
							query: { ...searchParams, tab: tabItem },
						}}
						className={`px-6 pb-1 capitalize transition-all border-b-2  ${
							activeTab === tabItem
								? "text-blue-500  border-blue-500 font-medium"
								: "border-transparent"
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
	);
}
