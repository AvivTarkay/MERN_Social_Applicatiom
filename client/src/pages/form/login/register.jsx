import React, { useState, useRef } from "react";
import axios from "axios";

export function Register(props) {
	const userName = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	// const history = useHistory();
	const [successMsg, setSuccessMsg] = useState(false);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handleClick = async e => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("Passwords don't match!");
		} else {
			const user = {
				userName: userName.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				setSuccessMsg(prevState => !prevState);
				// history.push("/login");
				props.changeState(prevState => !prevState);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="base-container" ref={props.containerRef}>
			<div className="header">Register</div>
			<div className="content">
				<div className="image">
					<img src={`${PF}AnimationSign.png`} alt="" />
				</div>
				<div className="form">
					<form className="loginBox" onSubmit={handleClick}>
						<input
							placeholder="Username"
							required
							ref={userName}
							className="loginInput"
						/>
						<input
							placeholder="Email"
							required
							ref={email}
							className="loginInput"
							type="email"
						/>
						<input
							placeholder="Password"
							required
							ref={password}
							className="loginInput"
							type="password"
							minLength="6"
						/>
						<input
							placeholder="Password Again"
							required
							ref={passwordAgain}
							className="loginInput"
							type="password"
						/>
						{successMsg && <p className="moveToLogIn">Move to Login</p>}
						<button className="loginButton" type="submit">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

// export class Register extends Form {
// 	constructor(props) {
// 		super(props);
// 	}

// 	render() {
// 		return (
// 			<div className="base-container" ref={this.props.containerRef}>
// 				<div className="header">Register</div>
// 				<div className="content">
// 					<div className="image"></div>
// 					<div className="form">
// 						<div className="form-group">
// 							<label htmlFor="username">Username</label>
// 							<input type="text" name="username" placeholder="username" />
// 						</div>
// 						<div className="form-group">
// 							<label htmlFor="email">Email</label>
// 							<input type="text" name="email" placeholder="email" />
// 						</div>
// 						<div className="form-group">
// 							<label htmlFor="password">Password</label>
// 							<input type="text" name="password" placeholder="password" />
// 						</div>
// 					</div>
// 				</div>
// 				<div className="footer">
// 					<button type="button" className="btn" onClick={this.changeState}>
// 						Register
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}
// }
