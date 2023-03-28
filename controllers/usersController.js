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

const getFollowing = async (req, res) => {};

const getFollowingById = async (req, res) => {
	// Search user model and get the following array of ids and return true or false if the id is in the array

	const { user } = req.params;
	const { _id } = req.params;
	console.log(user, _id);

	const userSearch = await User.findOne({ username: user }).exec();
	if (!userSearch) return res.status(404).json({ message: "No user found" });

	const following = userSearch.following;
	const isFollowing = following.includes(_id);
	res.json(isFollowing).status(200);
};

module.exports = {
	getAllUsers,
	updateUser,
	getUser,
	getFollowingById,
	getFollowing,
};
