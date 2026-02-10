// --- Libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- Models
import User from "../../models/User.js";

// --- validations
import type { UserLoginDto, UserRegisterDto } from "../user/user.validation.js";

// --- Helpers
import {
  failureResponse,
  successResponse,
} from "../../shared/helpers/response.helper.js";

// --- Register User Service
export const registerUserService = async (data: UserRegisterDto) => {
  // --- Check Uniqueness
  const uniqueUser = await User.findOne({ email: data.email });
  if (uniqueUser) {
    return failureResponse({ message: "This email is already registered" });
  }

  // --- Hash Password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  // --- Create User
  const newUser = new User({
    userName: data.userName,
    email: data.email,
    password: hash,
  });
  await newUser.save();

  // --- Generate Token
  const token = jwt.sign(
    { id: newUser._id, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: (process.env.JWT_EXPIRES_IN! as any) || "30d" },
  );

  // --- Return user without password + token
  const { password: _password, ...userWithoutPassword } = newUser.toObject();
  return successResponse({ ...userWithoutPassword, token });
};

// --- Login User Service
export const loginUserService = async (data: UserLoginDto) => {
  // --- Find User
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    return failureResponse({
      message: "Invalid email or password",
      statusCode: 401,
    });
  }

  // --- Check Password
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) {
    return failureResponse({
      message: "Invalid email or password",
      statusCode: 401,
    });
  }

  // --- Generate Token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: (process.env.JWT_EXPIRES_IN! as any) || "30d" },
  );

  // --- Return user without password + token
  const { password: _password, ...userWithoutPassword } = user.toObject();
  return successResponse({ ...userWithoutPassword, token });
};
