import UserForm from "@/components/user-form";
import { Octokit } from "@octokit/core";
import Image from "next/image";

export default async function Home() {
	const octokit = new Octokit({
		auth: "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",
	});
	const res = await octokit.request("GET /user/followers", {
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
	// console.log(res);
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<UserForm />
		</main>
	);
}
