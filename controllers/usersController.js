const User = require("../model/User");

// this function is used to get all users from the database
// it is used in the route /api/users

const getUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

module.exports = { getUsers };
