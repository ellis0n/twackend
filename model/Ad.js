const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema({
  ad: {
    type: Object,
    require: true,
  },
  votes: {
    for: {
      type: Number,
      require: true,
      default: 0,
    },
    against: {
      type: Number,
      require: true,
      default: 0,
    },
  },
});

module.exports = mongoose.model("Ad", adSchema);
