import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { config } from './config/index.js';
import { requestIdMiddleware } from './middlewares/requestIdMiddleware.js';
import { sendResponse } from './utils/responseHandler.js';
import { logger } from './utils/logger.js';
import { AppError } from './errors/AppError.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

const app = express();

// Disable x-powered-by header to conceal Express signature
app.disable('x-powered-by');

// Security & Core Middlewares
app.use(helmet());
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Observability & Health Endpoints
app.get('/health', (_req, res) => {
  return sendResponse(res, 200, 'TechNest API Health Status OK', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/ready', (_req, res) => {
  return sendResponse(res, 200, 'Server readiness probe passed', { ready: true });
});

app.get('/live', (_req, res) => {
  return sendResponse(res, 200, 'Server liveness probe passed', { alive: true });
});

app.get('/metrics', (_req, res) => {
  return sendResponse(res, 200, 'Prometheus Metrics Placeholder', {
    cpuUsage: process.cpuUsage(),
    memoryUsage: process.memoryUsage(),
  });
});

// API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// 404 Route Not Found Handler
app.use((req: Request, res: Response) => {
  return sendResponse(res, 404, `Cannot ${req.method} ${req.originalUrl}`, {}, {}, [
    `Route ${req.method} ${req.originalUrl} not found`,
  ]);
});

// Centralized Error Handling Middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const requestId = (req.headers['x-request-id'] as string) || 'N/A';

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
});

export default app;
