const Pref = require("../model/Pref");
const Save = require("../model/Save");
const User = require("../model/User");

const updatePref = async (req, res) => {
  let pref = req.body.pref;
  console.log(pref);
  try {
    const user = await User.findOne({ username: req.body.user });
    console.log(user);
    user.pref.location = pref.location;
    user.pref.category = pref.category;
    const result = await user.save();
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

const getPref = async (req, res) => {
  try {
    let preferences = await Pref.find();
    res.json(preferences);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updatePref, getPref };
