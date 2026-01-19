// --- Libraries
import type {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// --- Models
import User, {validateUpdate} from "../models/User.js";

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
export const getAllUsers = asyncHandler(async (_: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
  return;
});

/**
 * @desc Get User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  // --- Find User Logic
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404).json({message: "User not found"});
    return;
  }
  res.status(200).json(user);
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
    const validate = validateUpdate(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.message});
      return;
    }

    // --- Check Existence
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    // --- Prepare Data
    let updatedData = {...validate.data};
    if (validate.data.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(validate.data.password, salt);
    }

    // --- Update
    const result = await User.findByIdAndUpdate(
      req.params.id,
      {$set: updatedData},
      {new: true},
    );

    // --- Exclude Password from Response
    const {password, ...otherData} = result!.toObject();

    // --- Response
    res.status(200).json({...otherData});
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
    // --- Check Existence
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    // --- Response
    res.status(200).json({message: "User has been deleted Successfully"});
    return;
  },
);
