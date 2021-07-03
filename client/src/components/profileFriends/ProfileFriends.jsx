import React from "react";
import { Link } from "react-router-dom";
import "./profilefriends.css";

function ProfileFriends({ friend }) {
	const { profilePicture, userName } = friend;
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const DEFAULT_COVER = process.env.REACT_APP_DEFAULT_COVER;

	return (
		<Link to={`/profile/${userName}`}>
			<div className="rightBarFollowing">
				<img
					className="rightBarFollowingImg"
					src={
						profilePicture
							? PUBLIC_FOLDER + profilePicture
							: `${DEFAULT_COVER}/defaultUser.png`
					}
					alt=""
				/>
				<span className="rightBarFollowingName">{userName}</span>
			</div>
		</Link>
	);
}

export default ProfileFriends;
