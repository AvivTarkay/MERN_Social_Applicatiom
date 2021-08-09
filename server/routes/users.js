const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//update user
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Account has been updated");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can update only your account!");
	}
});

const verify = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
			if (err) {
				return res.status(403).json("Token is not valid!");
			}

			req.user = user;
			next();
		});
	} else {
		res.status(401).json("You are not authenticated!");
	}
};

//*delete user
router.delete("/:id", verify, async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		console.log(req.body);
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account has been deleted");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		console.log(req.body.userId, req.params.id);
		return res.status(403).json("You are not allowed to delete this account!");
	}
});

//get a user
router.get("/", async (req, res) => {
	const userId = req.query.userId;
	const userName = req.query.userName;

	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ userName: userName });
		const { password, updatedAt, ...other } = user._doc;

		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get friends
router.get("/friends/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friends = await Promise.all(
			user.followings.map(friendId => {
				return User.findById(friendId);
			})
		);
		let friendList = [];
		friends.map(friend => {
			const { _id, userName, profilePicture } = friend;
			friendList.push({ _id, userName, profilePicture });
		});
		res.status(200).json(friendList);
	} catch (err) {
		res.status(500).json(err);
	}
});

//follow a user

router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("user has been followed");
			} else {
				res.status(403).json("you allready follow this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you cant follow yourself");
	}
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("user has been unfollowed");
			} else {
				res.status(403).json("you dont follow this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you cant unfollow yourself");
	}
});

module.exports = router;
