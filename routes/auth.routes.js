import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    let { firstName, lastName, email, phone, password } = req.body;

    email = email.toLowerCase();

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Invalid phone number" });

    if (!passwordRegex.test(password))
      return res.status(400).json({ message: "Weak password" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        phone,
      },
      token,
    });
  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        phone: user.phone,
        avatar: user.avatar || "",
      },
      token,
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
