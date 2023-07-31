const express = require("express");
const{getCategories,getCategory,createCategory,updateCategory,deleteCategory}=require("../controller/categoryController")
const router=express.Router();
const {shield, authorize} = require("../middleWares/shield");

router.route("/")
.get(getCategories)
.post(shield,authorize("admin"), createCategory )

router.route("/:id")
.get(getCategory)
.put(shield,authorize("admin"), updateCategory)
.delete(shield,authorize("admin"), deleteCategory)


module.exports=router;