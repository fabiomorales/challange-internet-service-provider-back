import 'reflect-metadata';
import '@shared/container';
import '@shared/infra/knexorm';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';

const http = express();

http.use(cors());

http.use(express.json());

http.use(routes);

http.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { http };
