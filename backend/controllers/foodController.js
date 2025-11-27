import foodModel from "../models/foodModel.js";
import fs from 'fs';
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).json({ ok: false, message: "Image file required" });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: req.file.filename, // Important: save the filename in DB
    });

    await food.save();
    res.json({ ok: true,message:"food item added succesfully",food: food });
  } catch (error) {
    console.error("Error from addFood:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
//getting all food
export const listFood=async(req,res)=>{
  try {
    const foods=await foodModel.find({});
    res.json({
      ok:true,
      data:foods
    })
  } catch (error) {
     console.error("Error from listFood:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
  }

  //delete food item

  export const deleteFoodItem=async(req,res)=>{
   try {
     const food=await foodModel.findById(req.body.id);
   fs.unlink(`uploads/${food.image}`, (err) => {
  if (err) console.error("Error deleting file:", err);
});
   await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      ok:true,
      message:"food removed"
    })
   } catch (error) {
     console.error("Error from deleteFoodItem:", error);
    res.status(500).json({ ok: false, error: error.message });
   }
  }
