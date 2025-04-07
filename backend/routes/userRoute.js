 const express = require("express");
 const User = require("../models/User");
 const jwt  = require('jsonwebtoken');
 const {protect} = require("../middleware/authMiddleware");
 const app = express();

 const router = express.Router();
 app.use(express.json());

 //@route POST /api/users/register
 //@desc Register user
 //@ccess Public
 router.post('/register', async(req, res)=>{
    const {name, email, password}= req.body;

    try{
        //register Logic
       let user = await User.findOne({email});
       if(user) return res.status(400).json({message:"User already exists"});

       user = new User({name, email, password});
       await user.save();

       //Create JWT payload
       const payload = {user:{id:user._id, role:user.role}}

       //Sign and return the token along with user data 
       jwt.sign(payload, process.env.JWT_SECRET,
        {expiresIn:"365d"},
        (err, token)=>{
            if(err) throw err;

            res.status(201).json({
                user:{
                    _id:user._id,
                    name: user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            });
        }
       );

     
    } catch(error){
      console.log(error);
      res.status(500).send("Server Error");
      
    }

 });

 //@route POST /api/users/login
 //@desc Authenticate user
 //@ccess public

 router.post('/login', async(req, res)=>{
    const {email, password}=req.body;

    try{
        //find the user by email
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"Invalod credentials"});
            const isMatch = await user.matchPassword(password);
        
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"})
             //Create JWT payload
       const payload = {user:{id:user._id, role:user.role}}

       //Sign and return the token along with user data 
       jwt.sign(payload, process.env.JWT_SECRET,
        {expiresIn:"365d"},
        (err, token)=>{
            if(err) throw err;

            res.json({
                user:{
                    _id:user._id,
                    name: user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            });
        }
       );
    } catch(errer){
        console.log(error);
        res.status(500).json("Server Error")
        
    }
 })

 //@route GET /api/users/profile
 //@desc Get Looged-in users profile (Protected route)
 //@ccess Private

 router.get('/profile', protect,  async(req, res)=> {
    res.json(req.user);
 })
 module.exports = router;