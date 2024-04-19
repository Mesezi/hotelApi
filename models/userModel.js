const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId:{
    type:String
  }, 
  fullName:{
    type:String ,
    required: [true, "Please enter full name"],
  }, 
  userType:{
    type:String,
    required: [true, "Please enter user type"],
  },
  email:{
    type:String,
    required: [true, "Please enter email address"],
  }, 
  password: {
    type:String,
    required: [true, "Please enter password"],
  }, 
  phoneNumber:{
    type:String,
    required: [true, "Please enter phone number"],
  }
},
  
  {
    timestamps: true,
  })

module.exports = mongoose.model("User", userSchema)