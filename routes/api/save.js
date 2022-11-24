const express = require("express");
const router = express.Router();
const adController = require("../../controllers/saveController");

router.route("/").post(adController.saveAd).get(adController.getAllSavedAds);

module.exports = router;
