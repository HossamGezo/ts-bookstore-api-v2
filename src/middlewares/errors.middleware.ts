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
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Something went wrong!";

  // --- MongoDB Bad ObjectId (CastError)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID Format";
  }

  // --- MongoDB Duplicate Key Error (e.g. Email exists)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
