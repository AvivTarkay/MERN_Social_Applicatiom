import React from "react";
import { format } from "timeago.js";
import "./message.css";

function Message({ message, myMessage }) {
	const { text, createdAt } = message;
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className={myMessage ? "message mine" : "message"}>
			<div className="messageTop">
				<img src={`${PF}gift.png`} alt="" className="messageImg" />
				<p className="messageText">{text}</p>
			</div>
			<div className="messageBottom">{format(createdAt)}</div>
		</div>
	);
}

export default Message;
