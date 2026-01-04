import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bio: String,
    profileImage: String
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
