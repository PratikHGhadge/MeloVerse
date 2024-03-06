import express from 'express';
import AuthController from './../controllers/authController';
import Middleware from '../middlewares/authmiddlewares';
const router = express.Router();
// Routes
router.post('/register', AuthController.registerController);
router.post('/login', AuthController.loginController);
router.get('/currentuser', Middleware.authMiddleware, AuthController.currentUserController);
export default router;
