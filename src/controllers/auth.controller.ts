// --- Libraries
import type {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- Local Files
import User, {validateLogin, validateRegister} from "../models/User.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Register New user
 * @route api/auth/register
 * @method POST
 * @access public
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Zod Validation
    const validate = validateRegister(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.issues[0]?.message});
      return;
    }

    // --- Check Uniqueness
    const uniqueUser = await User.findOne({email: validate.data.email});

    if (uniqueUser) {
      res.status(400).json({message: "This user already registered"});
      return;
    }

    // --- Hash User Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(validate.data.password, salt);

    // --- Create New User
    const newUser = new User({...validate.data, password: hash});
    await newUser.save();

    // --- Generate Token
    const token = jwt.sign(
      {id: newUser._id, isAdmin: newUser.isAdmin},
      process.env.JWT_SECRET_KEY!,
      {expiresIn: "30d"},
    );

    // --- Exclude Password from Response
    const {password, ...otherData} = newUser.toObject();

    // --- Response
    res.status(201).json({...otherData, token});
    return;
  },
);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // --- Zod Validation
  const validate = validateLogin(req.body);
  if (!validate.success) {
    res.status(400).json({message: validate.error.issues[0]?.message});
    return;
  }

  // --- Check Existence
  const user = await User.findOne({email: validate.data.email});
  if (!user) {
    res.status(400).json({message: "Invalid email or password"});
    return;
  }

  // --- Check Password
  const isPasswordMatch = await bcrypt.compare(
    validate.data.password,
    user.password,
  );
  if (!isPasswordMatch) {
    res.status(400).json({message: "Invalid email or password"});
    return;
  }

  // --- Generate Token
  const token = jwt.sign(
    {id: user._id, isAdmin: user.isAdmin},
    process.env.JWT_SECRET_KEY!,
    {expiresIn: "30d"},
  );

  // --- Exclude Password from Response
  const {password, ...otherData} = user.toObject();

  // --- Response
  res.status(200).json({...otherData, token});
  return;
});
