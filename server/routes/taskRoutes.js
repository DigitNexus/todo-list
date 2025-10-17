const router = require("express").Router()
const verify = require('../middleware/verifyToken')
const Tasks = require("../models/Task")
const { taskValidation } = require("../validation")

router.get('/', verify, async (req, res) => {
    try{
        const tasks = await Tasks.find({userId:req.user._id}).sort({ firstname: 1 })
        res.status(200).json({success:true, data:tasks})
    }catch(error){
        console.log("[ERROR]:", error)
        res.json({success:false, message:error.message})
    }
})
router.post('/add', verify, async (req, res) => {
    try{
        const {error} = taskValidation(req.body)
        if (error) {
            return res.status(400).json({success:false, message:error.details.message})
        }
        const newData = new Tasks({
            title: req.body.title,
            description: req.body.description,
            userId: req.user._id
        })

        await newData.save()
        res.status(200).json({success:true, message:"Task was created successfully"})

    }catch(error){
        console.log("[ERROR]:", error)
        res.json({success:false, message:error.details.message})
    }
})

router.put('/edit/:id', verify, async (req, res) => {
    try{

        const {error} = taskValidation(req.body)
        if (error) {
            return res.status(400).json({success:false, message:error.details.message})
        }
        const task = await Tasks.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                userId: req.user._id
            },{
                new: true
            }
        )
        if(!task){
            return res.status(404).send("Task with that id doesn't exists")
        }
        res.status(200).json({success:true, message:"Task edited successfully"})

    }catch(error){
        console.log("[ERROR]:", error)
        res.json({success:false, message:error.message})
    }
})

router.put('/complete/:id', verify, async (req, res) => {
    try{
        const task = await Tasks.findByIdAndUpdate(
            req.params.id,
            {
                status: true
            },{
                new: true
            }
        )
        if(!task){
            return res.status(404).send("Task with that id doesn't exists")
        }
        res.status(200).json({success:true, message:"Task marked as completed successfully"})

    }catch(error){
        console.log("[ERROR]:", error)
        res.json({success:false, message:error.message})
    }
})

router.delete('/delete/:id', verify, async (req, res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).json({success:false, message:"Task with that id doesn't exists"})
        }
        res.status(200).json({success:true, message:"Task deleted successfully"})
    }catch(error){
        console.log("[ERROR]:", error)
        res.json({success:false, message:error.details.message})
    }
})

module.exports = router