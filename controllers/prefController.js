const User = require("../model/User");

const updatePref = async (req, res) => {
  let { location, category } = req.body.pref;
  let username = req.body.user;
  console.log(location, category);

  try {
    const user = await User.findOne({ username: username });
    user.pref.location = location;
    user.pref.category = category;
    const result = await user.save();
    res
      .status(200)
      .json({ message: `The new preferences ${result.pref} have been saved.` });
  } catch (err) {
    console.error(err);
  }
};

const getPref = async (req, res) => {
  try {
    let user = await User.findOne({
      refreshToken: req.cookies.jwt,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updatePref, getPref };
