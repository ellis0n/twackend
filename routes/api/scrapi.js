const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.post("/ads", adController.scrapeAds);

module.exports = router;
