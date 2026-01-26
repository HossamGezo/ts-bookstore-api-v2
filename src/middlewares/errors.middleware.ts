import type {Request, Response, NextFunction} from "express";

/**
 * @desc Handle 404 Routes
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * @desc Global Error Handler
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err instanceof Error ? err.message : "Something went wrong!";

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : (err as Error).stack,
  });
};
