import { Request, Response, response } from "express";
import userModel from "./../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async registerController(req: Request, res: Response) {
    try {
      const { userName, email, password } = req.body as {
        userName: string;
        email: string;
        password: string;
      };
      // Check for existing user
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create and save new user
      const user = new userModel({ ...req.body, password: hashedPassword });
      await user.save();
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error in register API",
      });
    }
  }

  static async loginController(req: Request, res: Response) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      // Validate request body using TypeScript type checks
      if (!email || !password) {
        return res
          .status(400)
          .send({ success: false, message: "Missing required fields" });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!!, {
        expiresIn: "1d",
      });

      return res.status(200).send({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, userName: user.userName, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in login API",
        error: "Internal server error",
      }); // Avoid sending sensitive error details in production
    }
  }

  static async currentUserController(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      // Validate request body using TypeScript type checks
      if (!userId) {
        return res
          .status(400)
          .send({ success: false, message: "Missing required field: userId" });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      return res.status(200).send({
        success: true,
        message: "User fetched successfully",
        user: { id: user._id, userName: user.userName, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Unable to get current user",
        error: "Internal server error",
      });
    }
  }
  static async forgotPasswordController(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Await the findOne operation to ensure oldUser is populated
      const oldUser: any = await userModel.findOne({ email: email });

      if (!oldUser) {
        return res.status(400).send({
          success: false,
          message: "User with this email does not exist",
        });
      }

      const secret = process.env.JWT_SECRET + oldUser.password;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        { expiresIn: "5m" }
      );
      const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;

      return response.status(200).send(link);
    } catch (error) {
      console.error(error);
      // Optionally check for specific database errors here
      res.status(500).send({
        success: false,
        error: "Internal server error in forgot password",
      });
    }
  }

  static async resetPasswordController(req: Request, res: Response) {
    try {
      const { id, token } = req.params;
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        error: "Internal server error in reset password",
      });
    }
  }
}
export default AuthController;
