import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { AuthenticationError } from '../errors/AppError.js';
import { prisma } from '../config/prisma.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authorization token required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new AuthenticationError('User account inactive or not found');
    }

    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles.map((r) => r.role.name),
    };

    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      next(new AuthenticationError('Authentication token has expired'));
    } else {
      next(err instanceof AuthenticationError ? err : new AuthenticationError('Invalid authentication token'));
    }
  }
}
