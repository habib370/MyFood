// db.js - Updated with exact MongoDB Atlas connection string
import mongoose from 'mongoose';
//mongodb+srv://habib:habib2304008@cluster0.klvertd.mongodb.net/myFood
//mongodb://localhost:27017

//const MONGO_URL="mongodb://localhost:27017"
const MONGO_URL="mongodb+srv://habib:habib2304008@cluster0.klvertd.mongodb.net/myFood"
export const connectDB = async () => {
  await mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDB connected");
  });
}
