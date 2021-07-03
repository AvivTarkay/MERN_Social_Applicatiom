import "./friendslist.css";

function FriendsList({ friendsData }) {
	const { profilePicture, username } = friendsData;
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="leftbarFriend">
			<img
				src={PUBLIC_FOLDER + profilePicture}
				alt=""
				className="leftbarFriendImage"
			/>
			<span className="leftbarFriendName">{username}</span>
		</li>
	);
}

export default FriendsList;
