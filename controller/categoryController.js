const Category = require("../model/categoryModel");
const MyError = require("../utils/MyError");
const asyncHandler = require("../middleWares/asyncHandler")

exports.getCategories=asyncHandler (async(req, res, next)=>{
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            data: categories,
        }
    )
})
exports.getCategory=asyncHandler (async(req,res,next)=>{
        const category = await Category.findById(req.params.id).populate("orgs")
        if(!category){
            throw new MyError(req.params.id + " ID тай категори байхгүй", 400)
        }
        res.status(200).json({
            success: true,
            data:category,
        })
    }
);
exports.createCategory=asyncHandler(async(req,res)=>{
    console.log(req.files);
    
    const category = await Category.create(req.body)
    res.status(200).json({
        success: true,
        data: category,
    })
});

exports.updateCategory=asyncHandler(async(req,res,next)=>{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
        })
        if(!category){
            throw new MyError(req.params.id + " ID тай категори байхгүй байна", 400)
        }
        res.status(200).json({
            success: true,
            data:category
        })
});

exports.deleteCategory=asyncHandler(async(req,res,next)=>{
        const category = await Category.findByIdAndRemove(req.params.id)
        if(!category){
            throw new MyError(req.params.id + " ID тай категори байхгүй байна", 400)
        }
        res.status(200).json({
            success: true,
            data:category
        })
})
