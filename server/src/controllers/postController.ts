import { Request, Response } from "express";
import Post from "./../models/Post";

class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const { user, title, content } = req.body;

      // Access the uploaded image file information from req.file
      const imageFileName = (req as any).file.filename;

      const imagePath = `uploads/${imageFileName}`;

      const newPost = new Post({ user, poster: imagePath, title, content });

      await newPost.save();

      res.json({ message: "Post created successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating post" });
    }
  }

  static async getposts(req: Request, res: Response) {
    try {
      const posts = await Post.find().populate({
        path: "user",
        select: { userName: 1, _id: 1 },
      });
      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching posts",
        error: "Internal server error",
      });
    }
  }

  static async getPaginatedPosts(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      if (Number.isNaN(page) || Number.isNaN(limit)) {
        return res.status(400).json({
          message: "Invalid page or limit value. Both must be numbers",
        });
      }

      const skip = (page - 1) * limit;

      const posts = await Post.find()
        .populate({ path: "user", select: { userName: 1, _id: 1 } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // const totalPosts = await Post.countDocuments();

      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching posts",
        error: "Internal server error",
      });
    }
  }
}

export default PostController;
