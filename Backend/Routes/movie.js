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
        
            const movies=await movieModel.find({"userID":req.body.userID}).populate("userID")
            res.status(200).send(movies)
       
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})


movieRouter.get('/:id',auth,  async (req,res)=>{
const {id}=req.params
    try{
        
            const movie=await movieModel.findOne({_id:id})
            res.status(200).send(movie)
       
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})



movieRouter.post("/add-movie",upload.single("file"),auth, async(req, res) => {
  console.log("UserID here  : ",req.body.userID)

  console.log("from movie",req.headers)
    try {
      console.log("0")
      const {title,actors,rating} =req.body;
      const {file}=req;

     
  
      if(!file){
        return res.status(400).send({"Msz":"File is required"});
      }
      

      let moviePresent=await movieModel.findOne({title})
      console.log("kjbjnj")
        if(moviePresent){
            res.status(409).send({"msg": "movie Already Exists"});

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
          const releaseYear = currentTime.getFullYear();
  
          const dataForDB = new movieModel({
            image: imageUrlS3,
            title,
            actors,
            rating,
            releaseYear,
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
  

movieRouter.put("/update-movie/:Id",auth, async (req, res) => {
    let { Id } = req.params

    let newbody = req.body

    try {
        let updatedMovie= await movieModel.findByIdAndUpdate({ _id: Id }, newbody,)
        
        res.send({ "msg": " Movie dataupdated succesfully","data": updatedMovie })
    } catch (error) {
        res.send({ "error": "some error occured while updating" })
       
    }
})

movieRouter.delete("/delete-movie/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
       let DeletedData= await movieModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully",DeletedData })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})





module.exports={
    movieRouter
}