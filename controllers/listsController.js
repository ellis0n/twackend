const List = require("../model/List");
const User = require("../model/User");
const Ad = require("../model/Ad");

const getLists = async (req, res) => {
	const lists = await List.find().exec();
	return res.status(200).json(lists);
};

const createList = async (req, res) => {
	const { name, description, category, location } = req.body.newList;
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
		}
	} else {
		// follow
		following.push(_id);
	}

	await User.findOneAndUpdate(
		{ username: username },
		{ following: following },
		{ new: true }
	);

	return res.status(200).json({ message: "Followed" });
};

const updateList = async (req, res) => {
	//placeholder
};

const addToList = async (req, res) => {
	let { vote, ad, listId } = req.body;

	try {
		const list = await List.findById(listId).exec();
		if (!list) return res.status(404).json({ message: "No list found" });

		// Check if Ad is already saved
		const adCheck = await Ad.findOne({
			ad: ad,
		}).exec();

		// If ad is not saved,
		if (!adCheck) {
			const saveResult = await Ad.create({
				ad: ad,
				votes: {
					for: vote === true ? 1 : 0,
					against: vote === false ? 1 : 0,
				},
			});
		} else {
			// If ad is already in DB, update votes
			const updateResult = await Ad.findOneAndUpdate(
				{ ad: ad },
				{
					votes: {
						for: vote === true ? adCheck.votes.for + 1 : adCheck.votes.for,
						against:
							vote === false
								? adCheck.votes.against + 1
								: adCheck.votes.against,
					},
				}
			);
		}

		if (vote) {
			// Check if ad is already in list
			const adCheckInList = list.ads.some((a) => a.id === ad.id);
			if (adCheckInList) {
				// TODO: This should never run
				return res.status(200).json({ message: "Ad already in list" });
			} else {
				// Add ad to list
				list.ads.push(ad);
				const saveListResult = await list.save();
				console.log("list updated");
				return res.status(200).json({ message: "Ad added to list" });
			}
		} else {
			return res.status(200).json({ message: "Voted against" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getLists,
	createList,
	deleteList,
	addToList,
	getUserLists,
	getUserList,
	followList,
	updateList,
};
