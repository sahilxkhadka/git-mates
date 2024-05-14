import { Data } from "./definitions";

export const filterImposters = (followers: Data[], following: Data[]) => {
	const imposters: Data[] = [];
	following.forEach((user) => {
		const userId = user.id;
		let userFound = false;
		followers.forEach((user) => {
			if (userId === user.id) {
				userFound = true;
				return;
			}
		});
		if (!userFound) {
			imposters.push(user);
		}
	});
	return imposters;
};

export const filterFollowedUsers = (followers: Data[], following: Data[]) => {
	const filteredFollowers = followers.map((follower) => {
		let hasFollowed = false;
		const followerId = follower.id;
		following.forEach((user) => {
			if (user.id === followerId) {
				hasFollowed = true;
				return;
			}
		});
		return { ...follower, hasFollowed };
	});
	return filteredFollowers;
};
