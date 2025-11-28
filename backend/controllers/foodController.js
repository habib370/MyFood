import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add food item with Cloudinary upload
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).json({ ok: false, message: "Image file required" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "food_images", // optional: organize in folder
    });

    // Create food item with Cloudinary image URL & ID
    const food = new foodModel({
      name,
      description,
      price,
      category,
      imageUrl: uploadedImage.secure_url,
      imageId: uploadedImage.public_id, // store public_id for deletion
    });

    await food.save();

    // Optionally delete local file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    res.json({ ok: true, message: "Food item added successfully", food });
  } catch (error) {
    console.error("Error from addFood:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Get all food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ ok: true, data: foods });
  } catch (error) {
    console.error("Error from listFood:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Delete food item
export const deleteFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ ok: false, message: "Food not found" });
    }

    // Delete image from Cloudinary
    if (food.imageId) {
      await cloudinary.uploader.destroy(food.imageId);
    }

    // Delete food item from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ ok: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error from deleteFoodItem:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
