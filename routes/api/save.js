const express = require("express");
const router = express.Router();
const saveController = require("../../controllers/saveController");

router
  .route("/")
  .post(saveController.saveAd)
  .get(saveController.getAllSavedAds)
  .put(saveController.updateVote)
  .delete(saveController.deleteVote);

module.exports = router;
