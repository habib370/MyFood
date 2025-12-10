import userModel from "../models/userModel.js";
import foodModel from '../models/foodModel.js'
import Comments from '../models/commentModel.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
//import transporter from '../config/nodeMailer.js'
import sendMail from "../config/sendMail.js";
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
//register
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      ok: false,
      message: "entities required",
    });
  }
  try {
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({
        ok: false,
        message: "user already exists with this email",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({ ok: false, message: "enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ ok: false, message: "enter a strong password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
    });
    const user = await newUser.save();
    const token = createToken(user);
    res.json({
      ok: true,
      message: "registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error from register:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ ok: false, message: "entites required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ ok: false, message: "invalid email or password" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ ok: false, message: "invalid password" });
    }
    const token = createToken(user);

    res.json({
      ok: true,
      message: "logged in successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error from login:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.json({ ok: false, message: "Email required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ ok: false, message: "User not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in DB
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendMail(
      email,
      "Your verification code",
      `<p>Your OTP code is <strong>${otp}</strong></p>`
    );

    return res.json({ ok: true, message: "OTP sent" });
  } catch (error) {
    console.error("Error in /verify-email:", error);
    return res
      .status(500)
      .json({ ok: false, message: error.message || "Internal server error" });
  }
};

export const toChangeName = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.json({ ok: false, message: "entities required" });
  }
  const userId = req.userId;
  try {
    const user =await userModel.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );
    
    if (!user) {
      return res.json({ ok: false, message: "user not found" });
    }
    res.json({ok:true,message:"updated succesfully",user})
  } catch (error) {
    res.json({ok:false,message:error.message})
  }
};

export const toChagePass=async(req,res)=>{
  const {currPass,newPass}=req.body;
  const userId=req.userId;
  try {
    const user=await userModel.findById(userId);
    if(!user){
      return res.json({ok:false,message:"user not found"})
    }
    const isMatched=await bcrypt.compare(currPass,user.password);
    if(!isMatched){
      return res.json({ok:false,message:"wrong current password given"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPass, salt);
    user.password=hashPass;
    await user.save();
    res.json({ok:true,message:"password updated"});
  } catch (error) {
    res.json({ok:false,message:error.message})
  }
}

export const toComment=async(req,res)=>{
  const {commentText}=req.body;
  if(!commentText){
    return res.json("no comment yet")
  }
  try {
    const userId=req.userId;
   const user=await userModel.findById(userId);
   if(!user){
    return res.json({ok:false,message:"user not found"});
   }
   const item=await foodModel.findById(req.params.itemId);
   if(!item){
    return res.json({ok:false,message:"item not found"});
   }

    const newComment = new Comments({
      userId: user._id,
      firstName:user.firstName,
      lastName:user.lastName,
      itemId: item._id,
      commentText: commentText,
    });
    await newComment.save();
    res.json({ ok: true, comment: newComment });
  } catch (error) {
     console.log(error);
    res.json({ ok: false, message: `from toComment:${error.message}` });
  }
}
export const getAllComments=async(req,res)=>{
  try {

    const comments=await Comments.find({itemId:req.params.itemId})
    res.json({ok:true,comments:comments})
  } catch (error) {
      console.log(error);
    res.json({ ok: false, message: `from getAllComments:${error.message}` });
  }
}
