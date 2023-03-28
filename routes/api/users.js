const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const listsController = require("../../controllers/listsController");

router
	.route("/")
	.put(usersController.updateUser)
	.get(usersController.getAllUsers);

router.route("/:user").get(usersController.getUser);

router.route("/:user/following").get(usersController.getFollowing);

router.route("/:user/following/:_id").get(usersController.getFollowingById);

router
	.route("/:user/lists")
	.get(listsController.getUserLists)
	.post(listsController.createList);

router
	.route("/:user/lists/:_id")
	.get(listsController.getUserList)
	.delete(listsController.deleteList)
	.put(listsController.updateList)
	.post(listsController.followList);

module.exports = router;
