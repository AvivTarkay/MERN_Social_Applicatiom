import React from "react";
import {
	RssFeed,
	Chat,
	PlayCircleFilledOutlined,
	Group,
	Bookmark,
	HelpOutline,
	WorkOutline,
	Event,
	School,
} from "@material-ui/icons";
import { Users } from "../../hardCodedData";
import FriendsList from "../friendsList/FriendsList";
import { Link } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import "./leftbar.css";

function Leftbar() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm" className="leftBarContainer">
				<div className="leftbar">
					<div className="leftbarWrapper">
						<ul className="leftbarList">
							<li className="leftbarListItem">
								<RssFeed className="leftbarIcon" id="feed" />
								<span className="leftbarListItemText">Feed</span>
							</li>
							<Link
								to="/messenger"
								className="messengerLink"
								style={{ textDecoration: "none" }}
							>
								<li className="leftbarListItem">
									<Chat className="leftbarIcon" id="chat" />
									<span className="leftbarListItemText">Chat</span>
								</li>
							</Link>
							<li className="leftbarListItem">
								<PlayCircleFilledOutlined className="leftbarIcon" id="video" />
								<span className="leftbarListItemText">Videos</span>
							</li>
							<li className="leftbarListItem">
								<Group className="leftbarIcon" id="groups" />
								<span className="leftbarListItemText">Groups</span>
							</li>
							<li className="leftbarListItem">
								<Bookmark className="leftbarIcon" id="bookmarks" />
								<span className="leftbarListItemText">Bookmarks</span>
							</li>
							<li className="leftbarListItem">
								<HelpOutline className="leftbarIcon" id="question" />
								<span className="leftbarListItemText">Questions</span>
							</li>
							<li className="leftbarListItem">
								<WorkOutline className="leftbarIcon" id="jobs" />
								<span className="leftbarListItemText">Jobs</span>
							</li>
							<li className="leftbarListItem">
								<Event className="leftbarIcon" id="events" />
								<span className="leftbarListItemText">Events</span>
							</li>
							<li className="leftbarListItem">
								<School className="leftbarIcon" id="courses" />
								<span className="leftbarListItemText">Courses</span>
							</li>
						</ul>
						<button className="leftbarButton">Show More</button>
						<hr className="leftbarHr" />
						<ul className="leftbarFriendList">
							{React.Children.toArray(
								Users.map(friends => {
									return <FriendsList friendsData={friends} />;
								})
							)}
						</ul>
					</div>
				</div>
			</Container>
		</React.Fragment>
	);
}

export default Leftbar;
