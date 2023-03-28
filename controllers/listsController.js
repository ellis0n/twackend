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
	console.log(listSearch);
	if (!listSearch) return res.status(404).json({ message: "No list found" });
	return res.status(200).json(listSearch);
};

module.exports = {
	getLists,
	createList,
	deleteList,
	getUserLists,
	getUserList,
};
