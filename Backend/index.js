
const express = require('express')
require("dotenv").config()

const { userRouter } = require('./Routes/user')

const {auth}=require("./AuthMiddleware/Auth")
const cors=require("cors")
const { MongoDBconnection } = require('./Config/db')
const { movieRouter } = require('./Routes/movie')
const app = express()
app.use(express.json())
app.use(cors())





app.use("/user",userRouter)


app.use("/movie",movieRouter)


app.listen(process.env.PORT, async () => {
    try {
        await MongoDBconnection
        console.log("Connected to Database Succesfully");
    } catch (error) {
        console.log(error)
        console.log("error Occured while connectng to db");
    }
    console.log("server is connected to port number 5038");
})