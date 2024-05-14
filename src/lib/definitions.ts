export type Data = {
	login: string;
	id: string;
	avatar_url: string;
	url: string;
	html_url: string;
	hasFollowed?: boolean;
};

export type Tabs = "imposters" | "followers" | "following";
