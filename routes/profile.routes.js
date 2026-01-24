import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE or UPDATE profile (1:1)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // 🔐 trusted source
    const { bio, profileImage } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { bio, profileImage },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Profile save failed" });
  }
});

export default router;
