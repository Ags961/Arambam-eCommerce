import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { generateUserToken, generateAdminToken } from "../utils/token.js";

// ✅ User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User does not exist" });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateUserToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    if (password.length < 8)
      return res.status(400).json({ success: false, message: "Password must be 8+ characters" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await new userModel({ name, email, password: hashed }).save();

    const token = generateUserToken(newUser._id);
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Credentials required" });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateAdminToken();
      return res.status(200).json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  } catch (err) {
    console.error("Admin login error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };