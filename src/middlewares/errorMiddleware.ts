import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/ApiErros';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware (error: Error & ApiError, request: Request, response: Response, next: NextFunction) {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  const info = error.info || 'Something went wrong';
  console.log('errorMiddleware', error);
  return response.status(statusCode).json({ message, error: true, info });
};
