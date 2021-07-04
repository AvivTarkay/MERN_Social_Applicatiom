import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton } from "@material-ui/lab";
import MenuIconFunction from "../utils/menu";
import "./post.css";

function Post({ postData }) {
	const { description, img, createdAt, likes, userId, _id } = postData;
	const [like, setLike] = useState("");
	const [user, setUser] = useState({});
	const [isLiked, setIsLiked] = useState(false);
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setIsLiked(likes.includes(currentUser._id));
	}, [currentUser._id, likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(`/users?userId=${userId}`);
			setUser(response.data);
			setLoading(prevState => !prevState);
		};
		fetchUser();
	}, [userId]);

	const likeHandler = async () => {
		try {
			await axios.put("/posts/" + _id + "/like", { userId: currentUser._id });
		} catch (error) {
			console.log(error);
		}
		if (likes.length === 0) setLike(isLiked ? "" : likes + 1);
		if (likes.length >= 1) setLike(isLiked ? "" : "You and");
		setIsLiked(!isLiked);
	};

	const deletePost = async () => {
		try {
			await axios.delete("/posts/" + _id, { userId: currentUser._id });
		} catch (error) {
			console.log(error);
		}
	};
	//*skeleton options
	// 	{
	// 		 <Skeleton variant="text" />
	// <Skeleton variant="circle" width={40} height={40} />
	// <Skeleton variant="rect" width={210} height={118} />
	// 	}
	//*-----------------
	//*skeleton animation
	// 	{
	// 		 <Skeleton />
	// <Skeleton animation={false} />
	// <Skeleton animation="wave" />
	// 	}
	//*------------------

	return (
		<div className="postContainer">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user.userName}`}>
							{loading ? (
								<Skeleton variant="circle" width={40} height={40} />
							) : (
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
							)}
						</Link>
						{loading ? (
							<React.Fragment>
								<Skeleton
									animation="wave"
									width={100}
									style={{ marginLeft: 6 }}
								/>
								<Skeleton
									animation="wave"
									width={100}
									style={{ marginLeft: 6 }}
								/>
							</React.Fragment>
						) : (
							<React.Fragment>
								<span className="postUserName">{user.userName}</span>
								<span className="postDate">{format(createdAt)}</span>
							</React.Fragment>
						)}
					</div>
					<div className="postTopRight">
						{userId === currentUser._id && (
							<MenuIconFunction funcToExecute={deletePost} />
						)}
					</div>
				</div>
				<div className="postCenter">
					{loading ? (
						<React.Fragment>
							<Skeleton animation="wave" width={40} />
							<Skeleton
								animation="wave"
								variant="rect"
								width={"100%"}
								height={300}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<span className="postText">{description && description}</span>
							<img className="postImage" src={PUBLIC_FOLDER + img} alt="" />
						</React.Fragment>
					)}
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						{loading ? (
							<React.Fragment>
								<Skeleton variant="circle" width={20} height={20} />
								<Skeleton
									variant="circle"
									width={20}
									height={20}
									style={{ marginLeft: "5px" }}
								/>
							</React.Fragment>
						) : (
							<React.Fragment>
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
							</React.Fragment>
						)}
						<span className="postEmotionsCounter">
							{likes.length === 0
								? `${like}`
								: `${like} ${likes.length} people liked it`}
						</span>
					</div>
					<div className="postBottomRight">
						{loading ? (
							<Skeleton animation="wave" width={40} />
						) : (
							<span className="commentText">{user.comments} comments</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;
