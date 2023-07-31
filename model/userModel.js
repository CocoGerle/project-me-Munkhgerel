const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Хэрэглэгчийн нэрийг оруулна уу. "],
      trim: true,
      maxlength: [100, "Your text must be a max length is 100."],
    },
    email:{
        type:String,
        required:[true, "email ee orulache "],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email буруу байна."]
    },
    role:{
        type:String,
        required:[true, "Erhee oruul"],
        enum:["user", "admin"],
        default:"user"
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordToken:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
});

UserSchema.methods.getJWT = function(){
    const token = jwt.sign({id:this._id, role: this.role}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRESIN
    });
    return token;
};

UserSchema.methods.checkPassword=async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model("User", UserSchema);