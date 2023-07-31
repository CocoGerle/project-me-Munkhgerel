const express = require("express");
const {shield, } = require("../middleWares/shield");
const {upload} = require("../middleWares/upload")

const { getExhibits, getExhibit, createExhibit, updateExhibit, deleteExhibit} = require("../controller/exhibitController");
const router = express.Router();

router.route("/")
.post(shield, upload.array("image",10), createExhibit)
.get(getExhibits);

router.route("/:id")
.get(getExhibit)
.put(shield, updateExhibit)
.delete(shield, deleteExhibit);


module.exports = router;