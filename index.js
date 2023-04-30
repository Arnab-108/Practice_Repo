const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const {authRouter} = require("./routes/auth.router")
const {notesRouter} = require("./routes/notes.router")
const {auth} = require("./middleware/auth.middleware")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("Homepage")
})
app.use(auth)
app.use("/notes",notesRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running at port 8080")
})