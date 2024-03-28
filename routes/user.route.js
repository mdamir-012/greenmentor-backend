const Router=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { error } = require("console");
const { userModel } = require("../models/user.model");
require("dotenv").config();

const userController=Router();

// signup 
userController.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    bcrypt.hash(password,7,async(error,hash)=>{
        if(error){
            res.send("something went wrong, please try again");
        }
        const user=new userModel({
            name,
            email,
            password:hash
        })
        try{
            await user.save()
            res.json({message:"signup successfully"})
        }catch(err){
            console.log(err);
            res.json({message:"something went wrong,please try again"})
        }
    })
})

// login
userController.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
    const hash=user.password;

    bcrypt.compare(password,hash,function(error,result){
        if(error){
            res.json({message:"something went wrong"})
        }if(result){
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
            res.json({message:"Login successfull",token})
        }else{
            res.json({message:"invalid credentials"})
        }
    })
})


module.exports={userController};
