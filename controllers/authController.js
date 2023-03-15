const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	// console.log(user)
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: "Username and password are required." });

	const foundUser = await User.findOne({ username: user }).exec();
	// console.log(foundUser)
	if (!foundUser) return res.sendStatus(401).json({ message: "Unauthorized" });

	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		// create JWTs
		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "6000s" }
		);
		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };
