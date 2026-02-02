// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Local Files
import {
  validateLogin,
  validateRegister,
} from "../validations/user.validation.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Register New user
 * @route api/auth/register
 * @method POST
 * @access public
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateRegister(req.body);
    if (!validation.success) {
      res.status(400).json({ message: validation.error.issues[0]?.message });
      return;
    }

    // --- Register User Service
    const result = await registerUserService(validation.data);

    if (!result.success) {
      res.status(result.statusCode!).json({ message: result.message });
      return;
    }

    res.status(201).json(result.data);
  },
);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // --- Validation
  const validation = validateLogin(req.body);
  if (!validation.success) {
    res.status(400).json({ message: validation.error.issues[0]?.message });
    return;
  }

  // --- Login User Service
  const result = await loginUserService(validation.data);

  if (!result.success) {
    res.status(result.statusCode!).json({ message: result.message });
    return;
  }

  res.status(200).json(result.data);
});
