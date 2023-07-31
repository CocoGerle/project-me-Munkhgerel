
const express = require("express");
const {shield} = require("../middleWares/shield");
const {upload} = require("../middleWares/upload")

const { getOrgs, getOrg, createOrg, updateOrg, deleteOrg} = require("../controller/orgController");
const router = express.Router();

router.route("/")
.post(shield, upload.single("image",10), createOrg)
.get(getOrgs);

router.route("/:id")
.get(getOrg)
.put(shield, updateOrg)
.delete(shield, deleteOrg);


module.exports = router;
// upload.array("image", 10)