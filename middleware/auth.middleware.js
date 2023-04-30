const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
        if(token){
            try {
                const decoded = jwt.verify(token.split(" ")[1],'notes');
                if(decoded){
                    req.body.authorId = decoded.authorId
                    req.body.author = decoded.author
                    next()
                }
                else{
                    res.send({"msg":"Please login firse"})
                }
            } catch (error) {
                res.send({"err":error.message})
            }
        }
        else{
            res.send({"msg":"Please login firse"})
        }
}

module.exports = {auth}