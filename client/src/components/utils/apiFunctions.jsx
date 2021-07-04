import axios from "axios";

//* Rightbar getFriends
export const getFriends = async (userId, setFunc) => {
	try {
		const friendList = await axios.get(`/users/friends/${userId}`);
		setFunc(friendList.data);
	} catch (err) {
		console.log(err);
	}
};

//*Conversation getUser
export const getUser = async (userId, setFunc) => {
	try {
		const userResponse = await axios.get(`users/?userId=${userId}`);
		setFunc(userResponse.data);
	} catch (error) {
		console.log(error);
	}
};

//* Feed fetchPosts
export const fetchPosts = async (username, userId, setFunc) => {
	const response = username
		? await axios.get("/posts/profile/" + username)
		: await axios.get("posts/timeline/" + userId);
	setFunc(
		response.data.sort((p1, p2) => {
			return new Date(p2.createdAt) - new Date(p1.createdAt);
		})
	);
};
