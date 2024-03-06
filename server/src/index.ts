// import express, { Application } from 'express';
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 3000;
dotenv.config();
// Connect to MongoDB before starting the server
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// Your server routes
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
