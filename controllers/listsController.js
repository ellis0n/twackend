const List = require("../model/List");
const User = require("../model/User");

const getLists = async (req, res) => {
	const lists = await List.find().exec();
	return res.status(200).json(lists);
};

const createList = async (req, res) => {
	console.log("create");
	const { name, description, category, location } = req.body.newList;
	console.log(name, description, category, location);
	const list = new List({
		user: req.body.user,
		name: name,
		description: description,
		category: category,
		location: location,
		thumbnail: "",
		ads: [],
	});
	await list.save();
	return res.status(201).json(list);
};

const deleteList = async (req, res) => {
	const { _id } = req.params;
	await List.findByIdAndDelete(_id);
	return res.status(200).json({ message: "List deleted" });
};
const getUserLists = async (req, res) => {
	const { user } = req.params;
	const userSearch = await User.findOne({ username: user }).exec();
	if (!userSearch) return res.status(404).json({ message: "No user found" });
	const lists = await List.find({ user: user }).exec();
	if (!lists) return res.status(204).json({ message: "No lists found" });
	return res.status(200).json(lists);
};

const getUserList = async (req, res) => {
	const { _id } = req.params;
	const listSearch = await List.findOne({ _id: _id }).exec();
	if (!listSearch) return res.status(404).json({ message: "No list found" });
	return res.status(200).json(listSearch);
};

const followList = async (req, res) => {
	const { username } = req.body;
	const { _id } = req.params;

	console.log(username, _id);

	const listSearch = await List.findOne({ _id: _id }).exec();
	if (!listSearch) return res.status(404).json({ message: "No list found" });

	const userSearch = await User.findOne({ username: username }).exec();
	if (!userSearch) return res.status(404).json({ message: "No user found" });

	const following = userSearch.following;

	if (following.includes(_id)) {
		// unfollow
		const index = following.indexOf(_id);
		if (index > -1) {
			following.splice(index, 1);
			console.log("unfollowing");
		}
	} else {
		// follow
		following.push(_id);
		console.log("following");
	}

	await User.findOneAndUpdate(
		{ username: username },
		{ following: following },
		{ new: true }
	);

	return res.status(200).json({ message: "Followed" });
};

const updateList = async (req, res) => {
	console.log("update");
};

module.exports = {
	getLists,
	createList,
	deleteList,
	getUserLists,
	getUserList,
	followList,
	updateList,
};
