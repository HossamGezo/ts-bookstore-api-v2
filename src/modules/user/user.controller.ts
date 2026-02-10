// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Validations
import { validateUpdate } from "./user.validation.js";

// --- Services
import {
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "./user.service.js";
import { UserQuerySchema } from "../../shared/validations/query.validation.js";

// --- Types
import type { ServiceResult } from "../../shared/types/service.js";

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const validation = UserQuerySchema.safeParse(req.query);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: validation.error.issues[0]?.message,
    });
    return;
  }

  const result = (await getAllUsersService(validation.data)) as ServiceResult;
  res.status(200).json(result);
  return;
});

/**
 * @desc Get User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = (await getUserByIdService(req.params.id!)) as ServiceResult;

  if (!result.success) {
    res.status(result.statusCode!).json(result);
    return;
  }

  res.status(200).json(result);
  return;
});

/**
 * @desc Update User By Id
 * @route /api/users/:id
 * @method UPDATE
 * @access private (only admin & user himself)
 */
export const updateUserById = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateUpdate(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: validation.error.issues[0]?.message,
      });
      return;
    }

    // --- Update User By Id Service
    const result = (await updateUserByIdService(
      req.params.id!,
      validation.data,
    )) as ServiceResult;

    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);

/**
 * @desc Delete User By Id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 */
export const deleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = (await deleteUserByIdService(
      req.params.id!,
    )) as ServiceResult<{ message: string }>;

    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);
