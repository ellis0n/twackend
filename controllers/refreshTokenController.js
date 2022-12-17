const User = require("../model/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies)
  
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true })


  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET, 
    (err, token) => {
    
      if (err || foundUser.username !== token.username)
      return res.sendStatus(403);
    
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: token.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
