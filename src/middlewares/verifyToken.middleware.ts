import type { NextFunction, Request, Response } from "express";
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
  /**
   * FUTURE_SECURITY_UPGRADE & STANDARDS:
   * Currently, we are using a custom 'token' header for simplicity.
   * In a production-grade environment, consider these two industry standards:
   *
   * 1. AUTHORIZATION HEADER (Bearer Token):
   *    - Format: Authorization: Bearer <token>
   *    - Usage: Best for Mobile Apps, Third-party integrations, and Server-to-Server communication.
   *    - Implementation: const token = req.headers.authorization?.split(" ")[1];
   *
   * 2. HTTP-ONLY COOKIES (Secure Storage):
   *    - Usage: Best for Web Applications (React/Next.js) to prevent XSS attacks.
   *    - Security: Browsers manage cookies automatically and JS cannot access them.
   *    - Implementation: const token = req.cookies.token; (requires cookie-parser)
   */
  const token = req.headers.token;
  if (!token || typeof token !== "string") {
    res.status(401).json({ message: "No token provided or invalid format" });
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
    res.status(401).json({ message: "Invalid or expired token" });
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
        message: "Access denied. You are not authorized to perform this action",
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
