const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema({
  ad: {
    type: Object,
    require: true,
  },
  vote: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Save", saveSchema);
