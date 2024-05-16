import Link from "next/link";

interface Props {
	identifier: string;
	searchParams?: {
		tab?: string;
	};
}

export default function Tab({ searchParams }: Props) {
	const activeTab = searchParams?.tab;
	console.log(activeTab);
	return (
		<Link
			href={{
				query: { ...searchParams, tab: "imposters" },
			}}
			scroll={false}
			className='px-6 pb-1 capitalize border-b'
		>
			{"imposters"}
		</Link>
	);
}
