const express = require("express");
const router = express.Router();
const scrapeController = require("../../controllers/scrapeController");

router.route("/").post(scrapeController.scrapeAds);
module.exports = router;
