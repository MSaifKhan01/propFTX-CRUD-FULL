const mongoose=require("mongoose")

require("dotenv").config()


const MongoDBconnection= mongoose.connect(process.env.MongoUrl)

module.exports={MongoDBconnection}