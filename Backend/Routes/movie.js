const express=require("express")

const {movieModel}=require("../Models/movie")
const jwt=require("jsonwebtoken")
const { s3 } = require("../Config/S3_Config");
const fs = require("fs");

const {auth}=require("../AuthMiddleware/Auth")

const multer = require("multer");

const movieRouter= express.Router()

const bucketName = process.env.S3bucketName;
const upload = multer({ dest: "uploads/" });

movieRouter.get('/',auth,  async (req,res)=>{
  // 
  console.log("UserID here  : ",req.body.userID)
    // const token=req.headers.authorization
    // const decoded=jwt.verify(token,"jammi")
    try{
        if(decoded){
            const movies=await movieModel.find({"userID":decoded.userID})
            res.status(200).send(movies)
        }
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})



movieRouter.post("/add-movie",upload.single("file"),auth, async(req, res) => {
    try {
      console.log("0")
      const {title,actors,rating} =req.body;
      const {file}=req;

     
  
      if(!file){
        return res.status(400).send({"Msz":"File is required"});
      }
  
      const fileContent = fs.readFileSync(file.path);

      
  
      const params={
        Bucket:bucketName,
        Key:`${file.originalname}`,
        Body:fileContent,
      };
  console.log("1")
      s3.upload(params,async(err,data)=>{
        if(err){
          
          return res.status(500).send("Internal Server Error");
        }
        console.log("2")
  
        
        const imageUrlS3=data.Location;
  
        try {
          // Assuming you're extracting the user ID correctly from req.body.user
          const userId = req.body.userID;
          console.log("from post userID : ",userId)
  
          const currentTime = new Date();
          const options = {
            hour12: false,
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
  
          const formattedTime = currentTime.toLocaleString("en-IN", options);
          console.log("3")
  
          const dataForDB = new movieModel({
            image: imageUrlS3,
            title,
            actors,
            rating,
            releaseYear: formattedTime,
            userID: userId,
          });
  
          await dataForDB.save();
          res.status(200).send({ "Msz": "A New Movie has been added" });
        } catch (err) {
          res.status(400).send({ "Msz": err.message });
        }
      });
    } catch (err) {
      res.status(500).send({ "Msz": "Internal Server Error" });
    }
  });
  

movieRouter.put("/update-movie/:Id", async (req, res) => {
    let { Id } = req.params

    let newbody = req.body

    try {
        await movieModel.findByIdAndUpdate({ _id: Id }, newbody)
        res.send({ "msg": " Movie dataupdated succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while updating" })
        console.log(error)
    }
})

movieRouter.delete("/delete-movie/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
        await movieModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})




movieRouter.patch("/update",async(req,res)=>{

})
module.exports={
    movieRouter
}