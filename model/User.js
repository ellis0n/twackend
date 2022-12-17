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
  roles: [{
      type: String,
      default: "User"
    }],
  active: {
    type: Boolean,
    default: true
  }
  pref: {
    location: {
      type: Number,
      default: 0,
    },
    category: {
      type: Number,
      default: 0,
    },
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
