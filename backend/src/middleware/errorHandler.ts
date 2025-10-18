import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import { ValidationError } from 'express-validator';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose duplicate key error
  if (error.name === 'MongoServerError' && (error as MongoError).code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    const message = `${field} already exists`;
    error = {
      name: 'ValidationError',
      message,
      statusCode: 409,
      code: 'DUPLICATE_RESOURCE',
    } as any;
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values((error as any).errors).map((val: any) => val.message).join(', ');
    error = {
      name: 'ValidationError',
      message,
      statusCode: 400,
      code: 'VALIDATION_ERROR',
    } as any;
  }

  // Mongoose cast error
  if (error.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      name: 'CastError',
      message,
      statusCode: 404,
      code: 'RESOURCE_NOT_FOUND',
    } as any;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = {
      name: 'JsonWebTokenError',
      message,
      statusCode: 401,
      code: 'AUTHENTICATION_REQUIRED',
    } as any;
  }

  if (error.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = {
      name: 'TokenExpiredError',
      message,
      statusCode: 401,
      code: 'AUTHENTICATION_REQUIRED',
    } as any;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Internal server error',
    },
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not found - ${req.originalUrl}`) as CustomError;
  error.statusCode = 404;
  error.code = 'RESOURCE_NOT_FOUND';
  next(error);
};