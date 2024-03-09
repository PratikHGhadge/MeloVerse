import express from "express";
import AuthController from "./../controllers/authController";
import Middleware from "../middlewares/authmiddlewares";
import { loginLimiter } from "../middlewares/rateLimiting";
const router = express.Router();
// Routes
router.post("/register", AuthController.registerController);
router.post("/login", loginLimiter, AuthController.loginController);
router.post("/forgot-password", AuthController.forgotPasswordController);
router.get(
  "/reset-password/:id/:token",
  AuthController.resetPasswordController
);
router.get(
  "/currentuser",
  Middleware.authMiddleware,
  AuthController.currentUserController
);
export default router;
