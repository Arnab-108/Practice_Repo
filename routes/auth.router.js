const express = require("express")
const {authModel} = require("../models/auth.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,password,age} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            const data = authModel({name,email,password:hash,age})
            await data.save()
            res.send({"msg":"New User Added!"})
        });
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})


authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await authModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({authorId:user._id,author:user.name }, 'notes');
                    res.status(200).send({"msg":"Login Successfull","token":token})
                }
                else{
                    res.status(200).send({"msg":"Invalid user details"})
                }
            });
        }
        else{
            res.status(200).send({"msg":"Invalid user details"})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})
module.exports={authRouter}