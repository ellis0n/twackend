const express = require("express");
const router = express.Router();
const paramController = require("../../controllers/paramController");

router
  .route("/")
  .put(paramController.updateParam)
  .get(paramController.getParam)

  module.exports = router;
