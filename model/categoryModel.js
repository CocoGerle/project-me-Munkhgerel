const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "You have to write 'name' field. "],
      unique: true,
      trim: true,
      maxlength: [100, "Your text must be a max length is 100."],
    },
    image: {
      type: String,
      // Энэ утга руу юм хийхгүй бол default аар өгөдлийн санд mongodb дотор юу гэж хийж өгөх вэ гэдгийг хадгална.
      default: "no-photo.jpg",
    },
},{
  toJSON:{virtuals:true}, toObject:{virtuals:true}
},
)
CategorySchema.virtual("orgs",{
  ref:"Org",
  localField : "_id",
  foreignField:"category",
  justOne:false
});

module.exports = mongoose.model("Category", CategorySchema);