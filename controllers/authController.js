const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(user)
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({username: user}).exec();
  console.log(foundUser)
  if (!foundUser) return res.sendStatus(401).json({ message: 'Unauthorized' })

  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log(match)
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
            "username": foundUser.username,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();
    console.log(result)

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

// const refresh = (req, res) => {
//     const cookies = req.cookies
//     console.log(JSON.stringify(req.cookies))
//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt
//     console.log(refreshToken)

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         asyncHandler(async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })

//             const foundUser = await User.findOne({ username: decoded.username }).exec()

//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": foundUser.username,
//                         "roles": foundUser.roles
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '15m' }
//             )

//             res.json({ accessToken })
//         })
//     )
  

module.exports = { handleLogin };
