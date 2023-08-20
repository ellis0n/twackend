const express = require("express");
const router = express.Router();
const voteController = require("../../controllers/voteController");
const listController = require("../../controllers/listsController");

router
	.route("/")
	.post(listController.addToList)
	.get(voteController.getAllSavedAds)
	.put(voteController.updateVote)
	.delete(voteController.deleteVote);

module.exports = router;
