const User = require("../model/User");

// this function is used to get all users from the database
// it is used in the route /api/users

const getAllUsers = async (req, res) => {
	const users = await User.find();
	if (!users) return res.status(204).json({ message: "No users found" });
	res.json(users);
};

const updateUser = async (req, res) => {
	const user = await User.findOne({ username: req.body.user });
	console.log(user);
	res.json(user);
};

const getUser = async (req, res) => {
	const user = await User.findOne({ username: req.params.user });
	if (!user) return res.status(204).json({ message: "No user found" });
	const safeUser = Object.assign(
		{},
		{
			username: user.username,
			pref: user.pref,
		}
	);
	res.json(safeUser);
};

module.exports = { getAllUsers, updateUser, getUser };
