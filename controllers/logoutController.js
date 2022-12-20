const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None",
    secure: false,
     });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", 
  secure: false 
});
  res.sendStatus(204);
};

module.exports = { handleLogout };
