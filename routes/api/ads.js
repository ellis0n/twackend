const express = require("express");
const router = express.Router();
const adController = require("../../controllers/adController");

router.route("/ads")
.get(adController.scrapeAds);
// .post(adController.createNewAd)
// .put(adController.updateAd)
// .delete(adController.scrapeAds)
// .get(adController.getAd);

module.exports = router;
