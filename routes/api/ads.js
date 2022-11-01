const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.route("/").get(adController.getAllAds);
// .post(adController.createNewAd)
// .put(adController.updateAd)
// .delete(adController.scrapeAds)
// .get(adController.getAd);

module.exports = router;