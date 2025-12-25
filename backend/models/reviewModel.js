import mongoose from 'mongoose'

const userReview = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  rating: { type: Number, required: true,default:0 },
  comment: { type: String, default: '' }
})

const reviewModel = mongoose.models.review || mongoose.model("review", userReview);
export default reviewModel;
