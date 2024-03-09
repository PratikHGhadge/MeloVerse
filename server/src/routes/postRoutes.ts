import express from "express";
import PostController from "./../controllers/postController";
const router = express.Router();
const multer = require("multer");
import { upload } from "../middlewares/multer";
import Middleware from "../middlewares/authmiddlewares";
// Routes
// router.get("/get-posts", PostController.getposts);
router.get("/get-posts", PostController.getPaginatedPosts);
router.post(
  "/create-post",
  Middleware.authMiddleware,
  upload.single("poster"),
  PostController.createPost
);
export default router;
