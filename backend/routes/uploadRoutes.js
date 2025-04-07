const express = require('express');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const streamifier = require('streamifier');


require('dotenv').config();
const router = express.Router();

//Cloudnary Configuration
cloudinary.config({
    cloud_name:process.env.COULDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

//Multer setup using memoery storage
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/", upload.single("image"), async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }

         //Function to handle the stream upload to cloudinary
         const streamUpload = (filebuffer) => {
            return new Promise((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream((error, result)=>{
                    if(result){
                       resolve(result);
                    }else {
                        reject(error);
                    }
                });

                // User Streamifier to convert file buffer to a stream
                streamifier.createReadStream(filebuffer).pipe(stream);
            })
         };

         //Call the streamUpload function
         const result = await streamUpload(req.file.buffer);

         //Respond with the uploaded image url 
         res.json({imageUrl: result.secure_url});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Server error"})
    }
});

module.exports = router;