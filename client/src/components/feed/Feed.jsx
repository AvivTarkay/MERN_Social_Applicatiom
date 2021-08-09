import React, { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import {
	CssBaseline,
	Container,
	Zoom,
	Fab,
	Toolbar,
	useScrollTrigger,
	makeStyles,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { AuthContext } from "../../context/AuthContext";
import { fetchPosts } from "../utils/apiFunctions";
import "./feed.css";

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
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetchPosts(username, user._id, setPosts);
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
