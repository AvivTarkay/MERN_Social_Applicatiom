import React, { useEffect, useState } from "react";
import { getUser } from "../utils/apiFunctions";
import "./conversation.css";

function Conversation({ conversation, currentUser }) {
	const [user, setUser] = useState(null);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const DF = process.env.REACT_APP_DEFAULT_FOLDER;

	useEffect(() => {
		const friendId = conversation.members.find(
			member => member !== currentUser._id
		);
		getUser(friendId, setUser);
	}, [conversation, currentUser]);

	return (
		<div className="conversation">
			<img
				src={
					user?.profilePicture
						? `${PF}${user?.profilePicture}`
						: `${DF}defaultUser.png`
				}
				alt=""
				className="conversationImg"
			/>
			<span className="conversationName">{user?.userName}</span>
		</div>
	);
}

export default Conversation;
