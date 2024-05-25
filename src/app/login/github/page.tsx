// import { getAccessToken, getAuthFollowersList } from "@/lib/actions";

type Props = {
	searchParams?: {
		code: string;
	};
};

export default async function Github({ searchParams }: Props) {
	// await saveGithubCode();
	// await getAccessToken(searchParams?.code ?? "");
	// const authenticatedFollowers = await getAuthFollowersList();
	// console.log("🚀 ~ Github ~ authenticatedFollowers:", authenticatedFollowers);
	return <div>The Code is: {searchParams?.code}</div>;
}
