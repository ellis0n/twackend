const User = require("../model/User");
const Vote = require("../model/Vote");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    // Encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // Create & Store new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    const voteResult = await Vote.create({
      username: user,
      votes: {
        for: [],
        against: [],
      },
    });

    res.status(201).json({ success: `New user created: ${user}.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
