const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  params: {
    location: {
      type: Number,
      default: 0
    },
    category: {
      type: Number,
      default: 0
    },
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
