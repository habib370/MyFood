import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
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
    res.json({   ok: true,
      message: "registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }, });
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

    res.json({   ok: true,
      message: "logged in successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }, });
  } catch (error) {
    console.error("Error from login:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
