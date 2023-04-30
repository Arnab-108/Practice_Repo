const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
    age:{type:Number , required:true}
},{
    versionKey:false
})

const authModel = mongoose.model("auth",authSchema)

module.exports = {authModel}