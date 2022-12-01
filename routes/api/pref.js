const express = require("express");
const router = express.Router();
const prefController = require("../../controllers/prefController");

router.route("/").put(prefController.updatePref).get(prefController.getPref);

module.exports = router;
