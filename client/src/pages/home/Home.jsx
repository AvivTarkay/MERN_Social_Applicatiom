import React from "react";
import TopBarTest from "../../components/topbar/TopBarTest";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./home.css";

export default function Home() {
	return (
		<React.Fragment>
			<TopBarTest />
			<div className="homeContainer">
				<Leftbar />
				<Feed />
				<Rightbar />
			</div>
		</React.Fragment>
	);
}
