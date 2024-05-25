import Link from "next/link";

export default async function Login() {
	return (
		<Link
			href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
		>
			Login with github
		</Link>
	);
}
