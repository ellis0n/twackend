const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prefSchema = new Schema({
  location: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Pref", prefSchema);