const Exhibit = require("../model/exhibitModel");
const path=require("path")
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleWares/asyncHandler");
const User = require("../model/userModel")

exports.getExhibits=asyncHandler (async(req, res, next)=>{
    const exhibit = await Exhibit.find().populate("org")
    res.status(200).json({
        success: true,
        data: exhibit
    })
})

exports.getExhibit=asyncHandler (async(req,res,next)=>{
    const exhibit = await Exhibit.findById(req.params.id).populate("org")
    if(!exhibit){
        throw new MyError(req.params.id + " ID тай үзвэр байхгүй", 400)
    }
    res.status(200).json({
        success: true,
        data:exhibit
    })
});

exports.createExhibit=asyncHandler(async(req,res)=>{
const exhibit = await Exhibit.create(req.body)
res.status(200).json({
    success: true,
    data: exhibit
})
});

exports.updateExhibit=asyncHandler(async(req,res)=>{
    const exhibit = await Exhibit.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    })
    if(!exhibit){
        throw new MyError(req.params.id + " ID тай үзвэр байхгүй байна", 400)
    }
    res.status(200).json({
        success: true,
        data:exhibit,
    });
});

exports.deleteExhibit=asyncHandler(async(req,res,next)=>{
    const exhibit = await Exhibit.findByIdAndDelete(req.params.id);
    if(!exhibit){
        throw new MyError(req.params.id + " ID тай үзвэр байхгүй байна", 400)
    }

    const user = await User.findById(req.userId)

    res.status(200).json({
        success: true,
        data:exhibit,
        deleteUser: user.name,
    })
});

