import React from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/userProfile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Form from "./pages/form/Form";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl" className="appContainer">
				<Router>
					<Switch>
						<Route exact path="/">
							{user ? <Home /> : <Form />}
						</Route>
						<Route path="/login">{user ? <Redirect to="/" /> : <Form />}</Route>
						<Route path="/register">
							{user ? <Redirect to="/" /> : <Form />}
						</Route>
						<Route path="/messenger">
							{user ? <Messenger /> : <Redirect to="/" />}
						</Route>
						<Route path="/profile/:userName">
							<Profile />
						</Route>
					</Switch>
				</Router>
			</Container>
		</React.Fragment>
	);
}

export default App;
