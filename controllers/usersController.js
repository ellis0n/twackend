const User = require("../model/User");
const List = require("../model/List");

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

const getFollowing = async (req, res) => {
	// Retrieve all users that the user is following

	const { user } = req.params;
	const { _id } = req.params;
	console.log(user, _id);

	const getFollowing = await User.findOne({ username: user }).exec();
	if (!getFollowing) return res.status(404).json({ message: "No user found" });

	const following = getFollowing.following;

	const followingLists = await List.find({ _id: { $in: following } }).exec();

	return res.json(followingLists).status(200);
};

const getFollowingById = async (req, res) => {
	//TODO: This function is half baked

	const { user } = req.params;
	const { _id } = req.params;
	console.log(user, _id);

	const userSearch = await User.findOne({ username: user }).exec();
	if (!userSearch) return res.status(404).json({ message: "No user found" });

	const following = userSearch.following;
	const check = following.includes(_id);

	if (check === true) {
		const followedUser = await User.findOne({ _id: _id }).exec();
		return res.json(followedUser).status(200);
	} else {
		return res.json(false).status(200);
	}
};

module.exports = {
	getAllUsers,
	updateUser,
	getUser,
	getFollowingById,
	getFollowing,
};
