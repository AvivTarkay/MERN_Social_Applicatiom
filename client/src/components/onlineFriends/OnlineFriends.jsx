import "./onlinefriends.css";

function OnlineUsers({ friend }) {
	const { profilePicture, username } = friend;
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="rightbarFriendItem">
			<div className="rightbarProfileImageContainer">
				<img
					src={PUBLIC_FOLDER + profilePicture}
					className="rightbarProfileImage"
					alt=""
				/>
				<span className="rightbarOnlineBadge"></span>
			</div>
			<span className="rightbarUserName" style={{ textDecoration: "none" }}>
				{username}
			</span>
		</li>
	);
}

export default OnlineUsers;
