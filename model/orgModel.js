const mongoose = require("mongoose")

const OrgSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "You have to write 'name' field. "],
      unique: true,
      trim: true,
      maxlength: [250, "Your text must be a max length is 250."],
    },
    image:{
      type:[String], require:true
    },
    address:{
      type: String,
      required: [true, "You have to write 'address' field. "],
      trim: true,
      maxlength: [5000, "Your text must be a max length is 50."],
    },
    timetable:{
        type: String,
        required: [true, "You have to write 'timetable' field. "],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }, 
  {
    toJSON:{virtuals:true}, toObject:{virtuals:true}
  }
  )
    OrgSchema.virtual("exhibit",{
      ref:"Exhibit",
      localField : "_id",
      foreignField:"org",
      justOne:false
    }
  )
module.exports = mongoose.model("Org", OrgSchema);