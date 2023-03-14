import bcrypt from "bcryptjs/dist/bcrypt.js";
import mongoose from "mongoose";
import { CreateError } from "../error.js";
import User from "../models/User.js";
export const signup= async (req,res,next)=>{
   try{
        
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password, salt);
    const newUser= new User({ ...req.body,password: hash});
    
    await newUser.save();
    res.status(200).send("User has been creater")

    }catch(err){
        next(err)

   }
}
export const signin= async (req,res,next)=>{
    try{
         const user = await User.findOne({name:req.body.name})
         if(!user) return next(CreateError(404,"User not found"))
        
         const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(CreateError(400,"Wrong password"))
        }catch(err){
         next(err)
 
    }
 }