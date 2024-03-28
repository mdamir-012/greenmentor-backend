const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { taskModel } = require("../models/task.model");

const taskController = Router();

// Read using get
taskController.get("/read", async (req, res) => {
  const taskData = await taskModel.find({ userId: req.body.userId });
  res.send(taskData)
});

// Add data using POST
taskController.post("/create",async(req,res)=>{
  const {title,description,userId}=req.body;

  const taskData= new taskModel({
    title,
    description,
    userId
  });
  try{
    await taskData.save();
    res.json({msg:"task added successfully"})
  }
  catch(err){
    console.log(err);
    res.json({msg:"something went wrong"})
  }
})


// delete data 
taskController.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;
  const taskDelete= await taskModel.findByIdAndDelete({_id:id,userId: req.body.userId})
  if(taskDelete){
    res.json({msg:"deleted successfully"})

  }else{
    res.json({msg:"not deleted"})
  }
  
})

// edit data using PATCH method
taskController.patch("/edit/:id",async(req,res)=>{
  const {id}=req.params;
  const updateTask=await taskModel.findByIdAndUpdate({_id:id,userId:req.body.userId},{...req.body})
  if(updateTask){
    res.json({msg:"edit successfully"})
   
  }else{
    res.json({msg:"not edited"})
    
  }
})


module.exports = { taskController };
