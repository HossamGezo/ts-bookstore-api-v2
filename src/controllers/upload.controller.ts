// --- Libraries
import type { Request, Response } from "express";
import {
  failureResponse,
  successResponse,
} from "../helpers/response.helper.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Upload Image
 * @route /api/upload
 * @method POST
 * @access public
 */
export const uploadImage = (req: Request, res: Response) => {
  // --- Failure
  if (!req.file) {
    const result = failureResponse({
      message: "No file provided",
      statusCode: 400,
    });
    res.status(result.statusCode).json(result);
    return;
  }

  // --- Success
  const result = successResponse({
    message: "Image Uploaded Successfully",
    filename: req.file.filename,
    path: `/images/${req.file.filename}`,
  });

  // --- Response
  return res.status(200).json(result);
};
