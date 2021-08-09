import "./rightbar.css";
import { Users } from "../../hardCodedData";
import ProfileFriends from "../profileFriends/ProfileFriends";
import OnlineUsers from "../onlineFriends/OnlineFriends";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { CssBaseline, Container } from "@material-ui/core";
import { getFriends } from "../utils/apiFunctions";
import axios from "axios";

export default function Rightbar({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext);

	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id)
	);

	useEffect(() => {
		getFriends(currentUser._id, setFriends);
	}, [user, currentUser._id]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put(`/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put(`/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			setFollowed(followed => !followed);
		} catch (err) {
			console.log(err);
		}
	};

	const HomeRightbar = () => {
		return (
			<React.Fragment>
				<div className="birthdayContainer">
					<img className="birthdayImg" src={`${PF}present.png`} alt="" />
					<span className="birthdayText">
						<b>Michal Tarkay</b> and <b>3 other friends</b> have a birthday
						today.
					</span>
				</div>
				<hr className="sponsoredHr" />
				<span className="sponsored">Sponsored</span>
				<img className="rightbarAd" src={`${PF}add.jpg`} alt="" />
				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">
					{React.Children.toArray(
						Users.map(friend => <OnlineUsers friend={friend} />)
					)}
				</ul>
			</React.Fragment>
		);
	};

	const ProfileRightbar = () => {
		return (
			<React.Fragment>
				{user.userName !== currentUser.userName && (
					<button className="rightbarFollowButton" onClick={handleClick}>
						{followed ? "Unfollow" : "Follow"}
						{followed ? <Remove /> : <Add />}
					</button>
				)}
				<h4 className="rightbarTitle">User information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Country:</span>
						<span className="rightbarInfoValue">{user.country}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From:</span>
						<span className="rightbarInfoValue">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship:</span>
						<span className="rightbarInfoValue">
							{user.relationship === 1
								? "Single"
								: user.relationship === 1
								? "Married"
								: "-"}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">User friends</h4>
				<div className="rightbarFollowings">
					{React.Children.toArray(
						friends.map(friend => {
							return <ProfileFriends friend={friend} />;
						})
					)}
				</div>
			</React.Fragment>
		);
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm" className="rightBarContainer">
				<div className="rightbar">
					<div className="rightbarWrapper">
						{user ? <ProfileRightbar /> : <HomeRightbar />}
					</div>
				</div>
			</Container>
		</React.Fragment>
	);
}
