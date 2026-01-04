import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, bio, profileImage } = req.body;

  const profile = await Profile.create({
    userId,
    bio,
    profileImage
  });

  res.json(profile);
});

export default router;
