const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
	listId: {
		type: String,
		require: true,
	},
	username: {
		type: String,
		require: true,
	},
	votes: {
		for: {
			type: Array,
			require: true,
			default: [],
		},
		against: {
			type: Array,
			require: true,
			default: [],
		},
	},
});
module.exports = mongoose.model("Vote", voteSchema);
