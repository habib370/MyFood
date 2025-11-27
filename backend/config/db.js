// db.js - Updated with exact MongoDB Atlas connection string
import mongoose from 'mongoose';
//mongodb+srv://habib:habib2304008@cluster0.klvertd.mongodb.net/myFood
//mongodb://localhost:27017
export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://habib:habib2304008@cluster0.klvertd.mongodb.net/myFood").then(() => {
    console.log("MongoDB connected");
  });
}
