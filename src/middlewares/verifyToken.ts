import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

/**
 * @desc Verify JWT Token Middleware
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // --- Check Existence
  /* 
    FUTURE_IMPROVEMENT (STANDARD_UPGRADE): 
    To follow the industry standard (OAuth 2.0 / Bearer Token):
    1. Switch to: const authHeader = req.headers.authorization;
    2. Extract token using: const token = authHeader.split(" ")[1];
    3. Ensure the Frontend sends: { Authorization: "Bearer <token>" }
  */
  const token = req.headers.token;
  if (!token || typeof token !== "string") {
    res.status(401).json({message: "No token provided or invalid format"});
    return;
  }

  // --- Ensure JWT_SECRET_KEY exists (Typescript safety check)
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is missing!");
  }

  // --- Decoded Token
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
    ) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: "Invalid or expired token"});
  }
};

/**
 * @desc Verify Token And Authorization Middleware
 */
export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    // --- Ensure that token belongs to user
    if (req.user?.id !== req.params.id && !req.user?.isAdmin) {
      res.status(403).json({
        message: "You are not allowed, you can only update your profile",
      });
      return;
    }
    next();
  });
};

/**
 * @desc Verify Token And Admin Middleware
 */
export const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    // --- Ensure that token belongs Admin
    if (!req.user?.isAdmin) {
      res.status(403).json({
        message: "You are not allowed, only admin allowed",
      });
      return;
    }
    next();
  });
};
