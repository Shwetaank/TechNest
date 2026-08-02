import { AppError } from '../errors/AppError.js';
import { sendResponse } from '../utils/responseHandler.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err: any, req: any, res: any, _next: any) => {
  const requestId = (req.headers && req.headers['x-request-id']) || 'N/A';

  if (err instanceof AppError) {
    logger.warn({
      requestId,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      url: req.originalUrl,
      method: req.method,
    });

    return sendResponse(
      res,
      err.statusCode,
      err.message,
      {},
      { requestId },
      err.errors.length > 0 ? err.errors : [err.message]
    );
  }

  logger.error({
    requestId,
    err,
    url: req.originalUrl,
    method: req.method,
  });

  return sendResponse(
    res,
    500,
    'Internal Server Error',
    {},
    { requestId },
    [err?.message || 'An unexpected error occurred']
  );
};
