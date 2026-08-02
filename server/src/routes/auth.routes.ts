import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();
const controller = new AuthController();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh-token', controller.refreshToken);
router.get('/me', authMiddleware, controller.getMe);

export default router;
