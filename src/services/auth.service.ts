import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import type {
  UserLoginDto,
  UserRegisterDto,
} from "../validations/user.validation.js";

// --- Register User
export const registerUserService = async (data: UserRegisterDto) => {
  // --- Check Uniqueness
  const uniqueUser = await User.findOne({ email: data.email });
  if (uniqueUser) {
    return {
      success: false,
      statusCode: 400,
      message: "This email is already registered",
    };
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
    { expiresIn: "30d" },
  );

  // --- Return user without password + token
  const { password, ...userWithoutPassword } = newUser.toObject();
  return {
    success: true,
    data: { ...userWithoutPassword, token },
  };
};

// --- Login User
export const loginUserService = async (data: UserLoginDto) => {
  // --- Find User
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid email or password",
    };
  }

  // --- Check Password
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid email or password",
    };
  }

  // --- Generate Token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: "30d" },
  );

  // --- Return user without password + token
  const { password, ...userWithoutPassword } = user.toObject();
  return {
    success: true,
    data: { ...userWithoutPassword, token },
  };
};
