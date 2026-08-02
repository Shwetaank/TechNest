import type { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.validator.js';
import { sendResponse } from '../../utils/responseHandler.js';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await this.authService.register(validated);
      sendResponse(res, 201, 'User registered successfully', result);
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await this.authService.login(validated);
      sendResponse(res, 200, 'Login successful', result);
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = refreshTokenSchema.parse(req.body);
      const result = await this.authService.refreshToken(validated.refreshToken);
      sendResponse(res, 200, 'Token refreshed successfully', result);
    } catch (err) {
      next(err);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      sendResponse(res, 200, 'User profile fetched successfully', { user: req.user });
    } catch (err) {
      next(err);
    }
  };
}
