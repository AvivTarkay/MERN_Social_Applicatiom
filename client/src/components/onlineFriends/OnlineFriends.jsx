import "./onlinefriends.css";
import { Link } from "react-router-dom";

function OnlineUsers({ friend }) {
	const { profilePicture, username } = friend;
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const DF = process.env.REACT_APP_DEFAULT_FOLDER;
	return (
		<li className="rightbarFriendItem">
			<div className="rightbarProfileImageContainer">
				<Link to={`/profile/${username}`}>
					<img
						src={
							profilePicture
								? PUBLIC_FOLDER + profilePicture
								: `${DF}defaultUser.png`
						}
						className="rightbarProfileImage"
						alt=""
					/>
				</Link>
				<span className="rightbarOnlineBadge"></span>
			</div>
			<span className="rightbarUserName" style={{ textDecoration: "none" }}>
				{username}
			</span>
		</li>
	);
}

export default OnlineUsers;
