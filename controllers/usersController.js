const User = require("../model/User");

// this function is used to get all users from the database
// it is used in the route /api/users

const getUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUsers };
