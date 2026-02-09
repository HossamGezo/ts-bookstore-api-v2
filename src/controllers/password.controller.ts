// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Validations
import {
  validateEmail,
  validatePassword,
} from "../validations/password.validation.js";

// --- Services
import {
  getResetPasswordViewService,
  resetPasswordService,
  sendForgotPasswordLinkService,
} from "../services/password.service.js";

// --- Types
import type { ServiceResult } from "../types/service.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Get Forgot Password View
 * @route /password/forgot-password
 * @method GET
 * @access public
 */
export const getForgotPasswordView = asyncHandler(
  async (_req: Request, res: Response) => {
    res.render("forgot-password");
  },
);

/**
 * @desc Send Forgot Password Link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */
export const sendForgotPasswordLink = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateEmail(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: validation.error.issues[0]?.message,
      });
      return;
    }

    // --- Service
    const result = (await sendForgotPasswordLinkService(
      validation.data,
    )) as ServiceResult;

    // --- Failure
    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.render("link-send");
  },
);

/**
 * @desc Get Reset Password View
 * @route /password/reset-password/:id/:token
 * @method GET
 * @access public
 */
export const getResetPasswordView = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Invalid
    if (!req.params.id && !req.params.token) {
      res.status(400).json({ message: "Invalid Request!" });
      return;
    }

    // --- Service
    const result = (await getResetPasswordViewService(
      req.params.id!,
      req.params.token!,
    )) as ServiceResult;

    // --- Failure
    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.render("reset-password", { email: result.data.email });
  },
);

/**
 * @desc Reset Password
 * @route /password/reset-password/:id/:token
 * @method POST
 * @access public
 */
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validatePassword(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: validation.error.issues[0]?.message,
      });
      return;
    }

    // --- Service
    const result = (await resetPasswordService(
      req.params.id!,
      req.params.token!,
      validation.data.password,
    )) as ServiceResult;

    // --- Failure
    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.render("success-password");
  },
);
