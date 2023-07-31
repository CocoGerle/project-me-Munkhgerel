const express = require("express");
const {register,login,getUser,getUsers,updateUser,deleteUser} = require("../controller/userController")
const {shield, authorize} = require("../middleWares/shield");
const router=express.Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route("/").get(getUsers)
router.route("/:id").get(getUser).put(shield, authorize("admin"), updateUser).delete(shield, authorize("admin"), deleteUser)
module.exports=router;