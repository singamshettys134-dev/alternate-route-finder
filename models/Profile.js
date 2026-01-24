import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 🔒 enforces 1:1 relationship
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
