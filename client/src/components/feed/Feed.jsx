import React, { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

//*material
const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function ScrollTop(props) {
	const { children, window } = props;
	const classes = useStyles();

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	const handleClick = event => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			"#back-to-top-anchor"
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default function Feed({ username }, props) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get("/posts/profile/" + username)
				: await axios.get("posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
			setLoading(prevState => !prevState);
		};
		fetchPosts();
	}, [username, user._id]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm" className="feedContainer">
				<div className="feed">
					<div className="feedWrapper">
						<Toolbar id="back-to-top-anchor" />
						{(!username || username === user.userName) && <Share />}
						{React.Children.toArray(
							posts.map(post => <Post postData={post} />)
						)}
					</div>
					<ScrollTop {...props}>
						<Fab color="secondary" size="small" aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</ScrollTop>
				</div>
			</Container>
		</React.Fragment>
	);
}
