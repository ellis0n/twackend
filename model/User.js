const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
	},

	password: {
		type: String,
		required: true,
	},

	refreshToken: [String],

	lists: {
		type: Array,
		default: [],
	},

	following: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("User", userSchema);
