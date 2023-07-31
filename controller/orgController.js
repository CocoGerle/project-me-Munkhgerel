const Org = require("../model/orgModel");
const path=require("path")
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleWares/asyncHandler");
const User = require("../model/userModel")

exports.getOrgs=asyncHandler (async(req, res, next)=>{
    const org = await Org.find().populate("exhibit")
    res.status(200).json({
        success: true,
        data: org
    })
})

exports.getOrg=asyncHandler (async(req,res,next)=>{
    const org = await Org.findById(req.params.id).populate("exhibit")
    if(!org){
        throw new MyError(req.params.id + " ID тай байгууллага байхгүй", 400)
    }
    res.status(200).json({
        success: true,
        data:org
    })
});

exports.createOrg=asyncHandler(async(req,res)=>{
const org = await Org.create(req.body)
res.status(200).json({
    success: true,
    data: org
})
});

exports.updateOrg=asyncHandler(async(req,res)=>{
    const org = await Org.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    })
    if(!org){
        throw new MyError(req.params.id + " ID тай байгууллага байхгүй байна", 400)
    }
    res.status(200).json({
        success: true,
        data:org,
    });
});

exports.deleteOrg=asyncHandler(async(req,res,next)=>{
    const org = await Org.findByIdAndDelete(req.params.id);
    if(!org){
        throw new MyError(req.params.id + " ID тай байгууллага байхгүй байна", 400)
    }

    const user = await User.findById(req.userId)

    res.status(200).json({
        success: true,
        data:org,
        deleteUser: user.name,
    })
});

exports.photoOrg=asyncHandler(async(req,res,next)=>{
    const org = await Org.findById(req.params.id)
    if(!org){
        throw new MyError(req.params.id + " ID тай байгууллага байхгүй байна", 400)
    }
    const file = req.files.file
    if(!file.mimetype.startsWith("image")){
        throw new MyError("Заавал зураг оруулах ёстой", 400)}
    
    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err =>{
       if(err){
        throw new MyError("File huulahad aldaa garsn bn aaaaaa. aldaa: "+ err.message , 400)
       }
       org.photo=file.name;
       org.save();

        res.status(200).json({
        success: true,
        data:file.name
    })
    })
});