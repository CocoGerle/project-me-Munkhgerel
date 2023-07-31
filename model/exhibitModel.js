const mongoose = require("mongoose")

const ExhibitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "You have to write 'name' field. "],
        unique: true,
        trim: true,
        maxlength: [250, "Your text must be a max length is 250."],
    },
    image:{
        type:[String],
        default: "no-photo.jpg"
    },
    description:{
        type:String,
        required: [true, "You have to write 'description' field. "],
    },
    artist:{
        type:String,
        required: [true, "You have to write 'artist' field. "],
        maxlength: [250, "Your text must be a max length is 250."],
    },
    startDate: {
        type: Date,
        required:[true, "Үзвэр эхлэх Date оруулна уу"]
    },
    endDate:{
        type:Date,
        required:[true, "Үзвэр дуусах Date оруулна уу"]
    },
    price:{
        type:Number,
        default:0
    },
    org:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Org"
    }
});

module.exports = mongoose.model("Exhibit", ExhibitSchema);