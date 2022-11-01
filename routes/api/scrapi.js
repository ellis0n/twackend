const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.delete("/ads", adController.scrapeAds);

module.exports = router;
