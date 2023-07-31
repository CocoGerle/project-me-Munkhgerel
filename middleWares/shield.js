const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const MyError = require("../utils/MyError");
const User = require("../model/userModel")

exports.shield=asyncHandler(async(req,res,next)=>{

    if(!req.headers.authorization){
        throw new MyError ("You have to be Admin,  Please login!" , 401)
    }
    
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        throw new MyError ("There is no Token" , 400)
    }
    const object = jwt.verify(token, process.env.JWT_SECRET);

    console.log(object)
    req.userId = object.id;
    req.userRole = object.role;


    next();
});

exports.authorize = (...roles) => {
    return(req,res,next)=>{
        if(!roles.includes(req.userRole)){
            throw new MyError ("You have to be Admin." , 403)
        }
        next();
    }   
}