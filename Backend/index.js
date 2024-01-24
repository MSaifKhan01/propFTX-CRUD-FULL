
const express = require('express')
require("dotenv").config()
const { connecting } = require('./Config/db')
const { userRouter } = require('./Routes/user')




const {auth}=require("./AuthMiddleware/Auth")
const cors=require("cors")
const app = express()
app.use(express.json())
app.use(cors())





app.use("/user",userRouter)





app.listen(process.env.PORT|| PORT, async () => {
    try {
        await connecting
        console.log("Connected to Database Succesfully");
    } catch (error) {
        console.log(error)
        console.log("error Occured while connectng to db");
    }
    console.log("server is connected to port number 5038");
})