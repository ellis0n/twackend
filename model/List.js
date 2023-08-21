const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
	user: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
		default: 0,
	},
	category: {
		type: String,
		require: true,
		default: 0,
	},
	ads: {
		type: Array,
		require: false,
		default: [],
	},
	followers: {
		type: Array,
		require: false,
		default: [],
	},
	thumbnail: {
		type: String,
		require: false,
		default: "",
	},
});

module.exports = mongoose.model("List", listSchema);
