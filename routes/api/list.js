const express = require("express");
const router = express.Router();
const scrapeController = require("../../controllers/scrapeController");

router.route("/").get(listController.getLists);
module.exports = router;
