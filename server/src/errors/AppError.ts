export class AppError extends Error {
  public statusCode: number;
  public errors: string[];

  constructor(message: string, statusCode = 500, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error', errors: string[] = []) {
    super(message, 400, errors);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication Failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Forbidden - Insufficient Permissions') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource Conflict') {
    super(message, 409);
  }
}

export class BusinessRuleError extends AppError {
  constructor(message = 'Business Rule Violation') {
    super(message, 422);
  }
}
