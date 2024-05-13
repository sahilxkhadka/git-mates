import OverView from "@/components/overview";
import UserForm from "@/components/user-form";
import { Suspense } from "react";

interface Props {
	searchParams?: {
		userName: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const userName = searchParams?.userName;
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			{userName ? (
				<Suspense fallback={<h1>Loadign....</h1>}>
					<OverView userName={userName} />
				</Suspense>
			) : (
				<UserForm />
			)}
		</main>
	);
}
