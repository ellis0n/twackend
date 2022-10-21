const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.delete("/scrape", adController.scrapeAds);

module.exports = router;
