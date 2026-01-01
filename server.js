import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Mongo error"));

app.get("/", (_, res) => res.send("Backend running"));

app.listen(5000, () => console.log("Server running on 5000"));
