import type { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors/AppError.js';

export function rbacMiddleware(allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthorizationError('User context missing'));
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return next(
        new AuthorizationError(
          `Forbidden: Required role matching one of [${allowedRoles.join(', ')}]`
        )
      );
    }

    next();
  };
}
