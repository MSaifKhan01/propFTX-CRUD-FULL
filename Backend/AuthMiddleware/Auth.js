const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    console.log("from Auth  :" ,token)
    if(token){
        console.log("hjnn")
       const decoded= jwt.verify(token,process.env.JWT_Secret)
       console.log(decoded)
       if(decoded){
        req.body.userID=decoded.userID
        
        next()
       }else{
        res.status(400).send({"Msz":"Plz Login First"})
       }
    }else{
        res.status(400).send({"msz":"Didn't Login"})
    }
}

module.exports={
    auth
}