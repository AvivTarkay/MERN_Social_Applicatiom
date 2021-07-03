import React, { useState, useEffect } from "react";
import TopBarTest from "../../components/topbar/TopBarTest";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import axios from "axios";
import "./profile.css";

function Profile() {
	const DEFAULT_FOLDER = process.env.REACT_APP_DEFAULT_FOLDER;
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	const userName = useParams().userName;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`/users?userName=${userName}`);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, [userName]);

	return (
		<React.Fragment>
			<TopBarTest />
			<div className="profileContainer">
				<Leftbar />
				<div className="profileRightSide">
					<div className="profileRightSideTop">
						<div className="profileCover">
							<img
								className="profileCoverImage"
								src={
									user.coverPicture
										? `${PUBLIC_FOLDER}${user.coverPicture}`
										: `${DEFAULT_FOLDER}/defaultCover.jpg`
								}
								alt=""
							/>
							<img
								className="profileUserImage"
								src={
									user.profilePicture
										? `${PUBLIC_FOLDER}${user.profilePicture}`
										: `${DEFAULT_FOLDER}/defaultUser.png`
								}
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.userName}</h4>
							<span className="profileInfoDescription">{user.description}</span>
						</div>
					</div>
					<div className="profileRightSideBottom">
						<Feed username={userName} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Profile;
