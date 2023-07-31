const User = require("../model/userModel");
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleWares/asyncHandler")

exports.register=asyncHandler(async(req,res)=>{
    const user = await User.create(req.body)
    const token = user.getJWT()
    res.status(200).json({
        success:true,
        token,
        user:user
    });
});

exports.login=asyncHandler(async(req,res)=>{
    const {email, password}=req.body

    if(!email || !password){
        throw new MyError("Email, nuuts ugee orul", 400) }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new MyError("Email, nuuts ugee zuw orul", 401)}
    const check = await user.checkPassword(password)
    if(!check) {
        throw new MyError("Email, nuuts ugee zuw orul", 401)}
    const jwt =user.getJWT()
    res.status(200).json({
        success:true,
        token:user.getJWT(),
        user:user
    });
});

exports.getUsers=asyncHandler (async(req, res, next)=>{
    const user = await User.find()
    res.status(200).json({
        success: true,
        data: user,
    }
)
})
exports.getUser=asyncHandler (async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        throw new MyError(req.params.id + " ID тай хэрэглэгч байхгүй", 400)
    }
    res.status(200).json({
        success: true,
        data:user,
    })
}
);

exports.updateUser=asyncHandler(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    })
    if(!user){
        throw new MyError(req.params.id + " ID тай хэрэглэгч байхгүй байна", 400)
    }
    res.status(200).json({
        success: true,
        data:user
    })
});

exports.deleteUser=asyncHandler(async(req,res,next)=>{
    const user = await User.findByIdAndRemove(req.params.id)
    if(!user){
        throw new MyError(req.params.id + " ID тай хэрэглэгч байхгүй байна", 400)
    }
    res.status(200).json({
        success: true,
        data:user
    })
})
