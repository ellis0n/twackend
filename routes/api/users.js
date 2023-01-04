const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.route("/").put(usersController.updateUser).get(usersController.getUsers);

module.exports = router;
