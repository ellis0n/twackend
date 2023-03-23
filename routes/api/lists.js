const express = require("express");
const router = express.Router();
const listController = require("../../controllers/listsController");

router.route("/").get(listController.getLists).post(listController.createList);

router.route("/:id").delete(listController.deleteList);
module.exports = router;
