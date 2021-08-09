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

//  const handleDelete = async id => {
// 		setSuccess(false);
// 		setError(false);
// 		try {
// 			await axiosJWT.delete("/users/" + id, {
// 				headers: { authorization: "Bearer " + user.accessToken },
// 			});
// 			setSuccess(true);
// 		} catch (err) {
// 			setError(true);
// 		}
//  };

//  const refreshToken = async () => {
// 		try {
// 			const res = await axios.post("/refresh", { token: user.refreshToken });
// 			setUser({
// 				...user,
// 				accessToken: res.data.accessToken,
// 				refreshToken: res.data.refreshToken,
// 			});
// 			return res.data;
// 		} catch (err) {
// 			console.log(err);
// 		}
//  };
