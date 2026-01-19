import type {Request, Response, NextFunction} from "express";

const logger = (req: Request, _req: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
  next();
};

export default logger;
