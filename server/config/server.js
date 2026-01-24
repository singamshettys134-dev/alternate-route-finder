import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "../../routes/auth.routes.js";
import profileRoutes from "../../routes/profile.routes.js";
import searchRoutes from "../../routes/search.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/auth", authRoutes);
    app.use("/api/profile", profileRoutes);
    app.use("/api/search", searchRoutes);

    app.get("/", (req, res) => {
      res.send("Backend running clean");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
