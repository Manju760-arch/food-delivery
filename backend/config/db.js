import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://manju:Manju1220@cluster0.m9gs3aq.mongodb.net/food-del').then(()=>console.log("DB connected"))
}