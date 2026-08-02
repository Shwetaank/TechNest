import type { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta: Record<string, any>;
  errors: string[];
}

export function sendResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T = {} as T,
  meta: Record<string, any> = {},
  errors: string[] = []
): Response {
  const payload: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    meta,
    errors,
  };
  return res.status(statusCode).json(payload);
}
