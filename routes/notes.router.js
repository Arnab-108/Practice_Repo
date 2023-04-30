const express = require("express")
const {notesModel} = require("../models/notes.model")
const notesRouter = express.Router()


notesRouter.get("/",async(req,res)=>{
    try {
        const data = await notesModel.find({authorId:req.body.authorId})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

notesRouter.post("/create",async(req,res)=>{
    try {
        const data = notesModel(req.body)
        await data.save()
        res.send("New Note Added!")
    } catch (error) {
        res.send(error)
    }
})

notesRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.authorId!==note.authorId){
            res.send({"msg":error.message})
        }
        else{
            await notesModel.findByIdAndUpdate({_id:id},req.body)
            res.send(`${id} is updated`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.authorId!==note.authorId){
            res.send({"msg":error.message})
        }
        else{
            await notesModel.findByIdAndDelete({_id:id})
            res.send(`${id} is deleted`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = {notesRouter}