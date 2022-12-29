const Pref = require("../model/Pref");
const Save = require("../model/Save");
const User = require("../model/User");

const updatePref = async (req, res) => {
  try {
    const preferences = await User.findOne({ userId: 0 });
    preferences.userId = preferences.userId;
    preferences.location = req.body.location;
    preferences.category = req.body.category;
    const result = await preferences.save();
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
