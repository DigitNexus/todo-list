const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const verify = require('../middleware/verifyToken')
const { loginValidation, registerValidation, changePassValidation }= require('../validation')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res)=>{

    const {error} = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //check if user exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists){
        return res.status(400).send("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        await user.save()
        return res.json({
            success:true, 
            message:"User registered successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false, 
            message:error.message
        })
    }
})

router.post('/login', async (req, res)=>{
    try {
        
    const {error} = loginValidation(req.body)
    if (error) {
        return res.status(400).json({success:false, message:error.message})
    }
    //check if user exists
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({ success: false, message: "Email/Password is wrong" });
    }
    //check if password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).json({ success: false, message: "password is wrong" });
    }

    //create and assign token
    const token = jwt.sign({_id: user._id, userType: user.userType}, process.env.TOKEN_SECRET)
    const data = {
        id: user._id,
        userType: user.userType,
        token
    }
    res.status(200).header('auth-token', token).json({success:true, data:data})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
})

router.patch('/change-password', verify,  async (req, res)=>{
    const {error} = changePassValidation(req.body)
    if (error) {
        return res.status(400).json({success:false, message:error.details[0].message})
    }
    //check if user exists
    const user = await User.findOne({_id: req.user._id})
    //check if password
    const validPass = await bcrypt.compare(req.body.currentPassword, user.password)
    if(!validPass){
        return res.status(400).json({ success: false, message: "Incorrect Password" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.newPassword, salt)
    user.password = hashedPass
    user.save()
    return res.status(200).json({ success: true, message: "Password chamged successfully" });
})

router.get('/logout', verify, async (req, res) => {
  const token = req.header('auth-token');
  if (token) {
    return res.status(200).json({ success: true, message: "Logged out successfuly" });
  } else {
    return res.status(400).json({ success: false, message: "No authToken found" });
  }
});

module.exports = router