const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  ad: {
    type: Object,
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

module.exports = mongoose.model("Ad", adSchema);
