const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema({
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

module.exports = mongoose.model("Save", saveSchema);
