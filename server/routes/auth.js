const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

router.post("/refresh", (req, res) => {
	//take the refresh token from the user
	const refreshToken = req.body.token;

	//send error if there is no token or it's invalid
	if (!refreshToken) return res.status(401).json("You are not authenticated!");
	if (!refreshTokens.includes(refreshToken)) {
		return res.status(403).json("Refresh token is not valid!");
	}
	jwt.verify(
		refreshToken,
		process.env.MY_REFRESH_SECRET_KEY,
		async (err, user) => {
			err && console.log(err);
			refreshTokens = refreshTokens.filter(token => token !== refreshToken);

			const newAccessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			refreshTokens.push(newRefreshToken);
			await User.findByIdAndUpdate(req.body.userId, {
				$set: {
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				},
			});
			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
				result: "Token has been successfully updated",
			});
		}
	);

	//if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = user => {
	return jwt.sign(
		{ email: user.email, isAdmin: user.isAdmin },
		process.env.SECRET_KEY,
		{
			expiresIn: "31556926s",
		}
	);
};

const generateRefreshToken = user => {
	return jwt.sign(
		{ email: user.email, isAdmin: user.isAdmin },
		process.env.MY_REFRESH_SECRET_KEY
	);
};

//*REGISTER
router.post("/register", async (req, res) => {
	try {
		const standbyUser = {
			userName: req.body.userName,
			email: req.body.email,
			isAdmin: req.body.isAdmin,
			password: req.body.password,
		};
		//*generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(standbyUser.password, salt);

		//*generate an access token
		const accessToken = generateAccessToken(standbyUser);
		const refreshToken = generateRefreshToken(standbyUser);
		//create new user
		const newUser = new User({
			userName: standbyUser.userName,
			email: standbyUser.email,
			isAdmin: standbyUser.isAdmin,
			password: hashedPassword,
			accessToken: accessToken,
			refreshToken: refreshToken,
		});

		refreshTokens.push(refreshToken);

		//save user and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

//*LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("user not found");

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json("wrong password");

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
