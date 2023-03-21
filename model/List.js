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
		require: false,
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
});

module.exports = mongoose.model("List", listSchema);
