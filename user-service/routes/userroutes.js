

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const multer = require ('multer')
const express = require("express");
const User = require('../module/user');
const { authentication } = require('../authentication');

const router = express.Router()


router.get("/profile", authentication, async(req,res)=>{
try {
    res.send('hello')
} catch (error) {
    console.log(error)
}
 })
let JWT_SECRET = "manishkumar682jaipursikarindia"


router.post('/register' , async (req,res)=>{
    try {
        const {username,password,email,role}= req.body;
        const exituser =  await User.findOne({email})
        if(exituser) return res.status(400).json({messages:"user alredy exists"})
        const hashedPassword =  await bcrypt.hash(password,10);
    const newuser =  new User({username,password:hashedPassword,email,role});
    await newuser.save()
    return res.status(200).json({newuser})
    } catch (error) {
        console.log(error)
        res.status(500).json({messages:"error"})
    }

}
)

router.post('/login',async(req,res)=>{
    try {
        const {email ,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"invalid credentials"});
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch) return res.status(400).json({message:"invalid credentials"})
            
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role },  JWT_SECRET ,{ expiresIn: '24h' });
const userdata ={
  userid: user._id,
  username: user.username,
email:user.email
}
  console.log(user)
  return res.status(200).json({ token ,userdata});
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})
module.exports = router
