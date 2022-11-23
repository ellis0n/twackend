const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.route("/").post(adController.saveAd);

module.exports = router;
