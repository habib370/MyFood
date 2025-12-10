import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    commentText: { type: String, required: true }
  },
  { timestamps: true }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comments;
