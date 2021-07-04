import React, { useState, useEffect } from "react";
import { getFriends } from "../utils/apiFunctions";
import axios from "axios";
import "./chatonline.css";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
	const [friends, setFriends] = useState([]);
	const [onlineFriends, setOnlineFriends] = useState([]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		getFriends(currentId, setFriends);
	}, [currentId]);

	useEffect(() => {
		setOnlineFriends(
			friends.filter(friend => onlineUsers.includes(friend._id))
		);
	}, [onlineUsers, friends]);

	const handleClick = async user => {
		try {
			const res = await axios.get(
				`/conversations/find/${currentId}/${user._id}`
			);
			setCurrentChat(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="chatOnline">
			{React.Children.toArray(
				onlineFriends.map(friend => (
					<div
						className="chatOnlineFriends"
						onClick={() => handleClick(friend)}
					>
						<div className="chatOnlineImgContainer">
							<img
								className="chatOnlineImg"
								src={
									friend.profilePicture
										? `${PF}${friend.profilePicture}`
										: `${PF}person/noAvatar.png`
								}
								alt=""
							/>
							<div className="chatOnlineBadge"></div>
						</div>
						<span className="chatOnlineName">{friend.userName}</span>
					</div>
				))
			)}
		</div>
	);
}

export default ChatOnline;
