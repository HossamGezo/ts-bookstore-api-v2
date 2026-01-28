import type {Request, Response, NextFunction} from "express";

/**
 * @desc Logger middleware to track HTTP requests
 */

const logger = (req: Request, _res: Response, next: NextFunction) => {
  const date = new Date().toISOString();
  const method = req.method;
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log(`[${date}] ${method} ${url}`);
  next();
};

export default logger;
