import React, { useState, useEffect, useContext } from "react";
import { MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import "./post.css";

function Post({ postData }) {
	const { description, img, createdAt, likes, userId, _id } = postData;
	const [like, setLike] = useState("");
	const [user, setUser] = useState({});
	const [isLiked, setIsLiked] = useState(false);
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(likes.includes(currentUser._id));
	}, [currentUser._id, likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(`/users?userId=${userId}`);
			setUser(response.data);
		};
		fetchUser();
	}, [userId]);

	const likeHandler = async () => {
		try {
			await axios.put("/posts/" + _id + "/like", { userId: currentUser._id });
		} catch (error) {}
		if (likes.length === 0) setLike(isLiked ? "" : likes + 1);
		if (likes.length >= 1) setLike(isLiked ? "" : "You and");
		setIsLiked(!isLiked);
	};

	return (
		<div className="postContainer">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user.userName}`}>
							<img
								className="postProfileImage"
								src={
									user.profilePicture
										? PUBLIC_FOLDER + user.profilePicture
										: user.gender === "male"
										? PUBLIC_FOLDER + "person/defaultMale.png"
										: PUBLIC_FOLDER + "person/defaultFemale.png"
								}
								alt=""
							/>
						</Link>
						<span className="postUserName">{user.userName}</span>
						<span className="postDate">{format(createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{description && description}</span>
					<img className="postImage" src={PUBLIC_FOLDER + img} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							className="postsIcons"
							src={`${PUBLIC_FOLDER}like.png`}
							alt=""
							onClick={likeHandler}
						/>
						<img
							className="postsIcons"
							src={`${PUBLIC_FOLDER}heart.png`}
							alt=""
							onClick={likeHandler}
						/>
						<span className="postEmotionsCounter">
							{likes.length === 0
								? `${like}`
								: `${like} ${likes.length} people liked it`}
						</span>
					</div>
					<div className="postBottomRight">
						<span className="commentText">{user.comments} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;
