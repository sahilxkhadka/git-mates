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
	console.log(imposters);
};
