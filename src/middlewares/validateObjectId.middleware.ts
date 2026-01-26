import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

/**
 * @desc Validate MongoDB ObjectId
 */
export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  // --- Check if the ID in the params is a valid MongoDB ObjectId
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID Format" });
    return;
  }

  next();
};