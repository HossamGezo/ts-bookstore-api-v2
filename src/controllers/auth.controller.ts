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
      res.status(400).json({message: validate.error.message});
      return;
    }

    // --- Check Uniqueness
    const uniqueUser = await User.findOne({email: req.body.email});

    if (uniqueUser) {
      res.status(400).json({message: "This user already registered"});
      return;
    }

    // --- Hash User Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // --- Create New User
    const newUser = new User({...validate.data, password: hash});
    await newUser.save();

    // --- Generate Token
    const token = jwt.sign(
      {id: newUser._id, isAdmin: newUser.isAdmin},
      process.env.JWT_SECRET_KEY!,
      {expiresIn: "30d"}
    );

    // --- Response
    const {password, ...otherData} = newUser.toObject();
    res.status(201).json({...otherData, token});
    return;
  }
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
    res.status(400).json({message: validate.error.message});
    return;
  }

  // --- isExist Logic
  const isExist = await User.findOne({email: req.body.email});
  if (!isExist) {
    res.status(400).json({message: "Invalid email or password"});
    return;
  }

  // --- Check Password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    isExist.password
  );
  if (!isPasswordMatch) {
    res.status(400).json({message: "Invalid email or password"});
    return;
  }

  // --- Generate Token
  const token = jwt.sign(
    {id: isExist._id, isAdmin: isExist.isAdmin},
    process.env.JWT_SECRET_KEY!,
    {expiresIn: "30d"}
  );

  // --- Exclude Password from Response
  const {password, ...otherData} = isExist.toObject();

  // --- Response
  res.status(200).json({token, ...otherData});
  return;
});
