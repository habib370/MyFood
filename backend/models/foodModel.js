import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, 
  imageId: { type: String, required: true },  
  isAvailable:{type:Boolean,default:true},
  discount:{type:Number,default:0}
},);
foodSchema.index({
  name: "text",
  category: "text",
  description: "text",
},);
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;
