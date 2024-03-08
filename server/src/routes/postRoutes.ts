import express from "express";
import PostController from "./../controllers/postController";
const router = express.Router();
const multer = require("multer");
import { upload } from "../middlewares/multer";
// Routes
router.get("/get-posts", PostController.getposts);
router.post("/create-post", upload.single("poster"), PostController.createPost);
export default router;
