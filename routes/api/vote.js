const express = require("express");
const router = express.Router();
const voteController = require("../../controllers/voteController");

router
  .route("/")
  .post(voteController.saveVote)
  .get(voteController.getAllSavedAds)
  .put(voteController.updateVote)
  .delete(voteController.deleteVote);

module.exports = router;
