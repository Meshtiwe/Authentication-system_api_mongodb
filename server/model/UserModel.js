const mongoose =require('mongoose')

const Userschema = require('../schema/UserSchema.js')


const User = mongoose.model("Users",Userschema)  //نعرف model باسم الجدول 

module.exports = User

