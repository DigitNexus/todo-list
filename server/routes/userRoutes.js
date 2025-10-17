const router = require('express').Router()
const User = require('../models/User')
const adminCheck = require('../middleware/adminCheck')

router.get('/', adminCheck, async (req,res)=>{
    try {
        const result = await User.find({})
        res.status(200).json({success:true, data:result})
    } catch (error) {
        res.json({success:false, message:error.details[0].message})
    }
})
router.put('/:id', adminCheck, async (req,res)=>{
    try {
        const result = await User.updateOne({_id: req.params.id}, {$set:{name: req.body.name, email:req.body.email, userType: req.body.userType}})
        if (result.nModified===0){
            return res.status(404).send("No user updated")
        }
        res.status(200).json({success:true, message:"User edited successfully"})
    } catch (error) {
        res.status(500).json({success:false, message:error.details[0].message})
    }
})
router.delete('/:id', adminCheck, async(req,res)=>{
    try {
        const result = await User.deleteOne({_id: req.params.id})
        if (result.deletedCount===0){
            return res.status(404).send("No user deleted")
        }
        res.status(200).json({success:true, message:"User deleted successfully"})
        
    } catch (error) {
        res.status(500).json({success:false, message:error.details[0].message})
    }
})

module.exports = router;