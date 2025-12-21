import mongoose from 'mongoose';

const commentReplySchema=new mongoose.Schema({
  commentId:{type:mongoose.Schema.Types.ObjectId, ref:"Comments"},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  replyText:{type:String,required:true},
},{timestamps:true})

const CommentReply=mongoose.models.CommentReply || mongoose.model("CommentReply",commentReplySchema);

export default CommentReply;