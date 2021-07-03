import React, { useRef, useContext } from "react";
import { loginCtrl } from "../../../apiCalls";
import { AuthContext } from "../../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./login.css";

export function Login(props) {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handleClick = e => {
		console.log("email =>", email.current.value, "password =>", password);
		e.preventDefault();
		loginCtrl(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};
	return (
		<div className="base-container" ref={props.containerRef}>
			<div className="header">Login</div>
			<div className="content">
				<div className="image">
					<img src={`${PF}AnimationLogin.png`} alt="" />
				</div>
				<div className="form">
					<form className="loginBox" onSubmit={handleClick}>
						<input
							placeholder="Email"
							type="email"
							required
							className="loginInput"
							ref={email}
						/>
						<input
							placeholder="Password"
							type="password"
							required
							minLength="6"
							className="loginInput"
							ref={password}
						/>
						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="white" size="20px" />
							) : (
								"Log In"
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<button className="loginRegisterButton">
							{isFetching ? (
								<CircularProgress color="white" size="20px" />
							) : (
								"Create a New Account"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
