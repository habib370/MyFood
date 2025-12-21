import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Cloudinary secure URL
  imageId: { type: String, required: true },  // Cloudinary public_id
});
foodSchema.index({
  name: "text",
  category: "text",
  description: "text",
});
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;
