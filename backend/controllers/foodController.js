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
// export const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({ ok: true, data: foods });
//   } catch (error) {
//     console.error("Error from listFood:", error);
//     res.status(500).json({ ok: false, error: error.message });
//   }
// };
export const listFood = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // current page
    const limit = parseInt(req.query.limit) || 10; // items per page

    const skip = (page - 1) * limit;

    const foods = await foodModel
      .find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional

    const totalItems = await foodModel.countDocuments();

    res.json({
      ok: true,
      data: foods,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
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

export const getSingleItem=async(req,res)=>{
  try {
    const item=await foodModel.findById(req.params.itemId);
    if(!item){
      res.json({ok:false,message:"item not found"})
    }
    res.json({ok:true,item:item})
  } catch (error) {
     console.log(error);
    res.json({ ok: false, message: `from getSingleItem:${error.message}` });
  }
}

export const searchItems= async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const foods = await foodModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    }).limit(10); // limit for performance

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const filterByCategory = async (req, res) => {
  try {
    // Find the item by its ID from params
    const uniqueItem = await foodModel.findById(req.params.itemId);

    if (!uniqueItem) {
      return res.status(404).json({ ok: false, message: "Item not found" });
    }

    const category = uniqueItem.category;

    // Find all items with the same category, excluding the original item
    const allSimilarItems = await foodModel.find({
      category: category,
      _id: { $ne: uniqueItem._id } // exclude the given item
    });

    return res.json({ ok: true, items: allSimilarItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: error.message });
  }
};

export default filterByCategory;
