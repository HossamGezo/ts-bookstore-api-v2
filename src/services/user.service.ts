import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { queryOperations } from "../helpers/query.helper.js";
import type { UserUpdateDto } from "../validations/user.validation.js";
import type { UserQueryDto } from "../validations/query.validation.js";

// --- Get All Users
export const getAllUsersService = async (queryParams: UserQueryDto) => {
  const { page } = queryParams;
  const limit = Number(process.env.USERS_PER_PAGE) || 5;
  const result = await queryOperations(User, { page: page || 1, limit });
  return {
    success: true,
    data: result,
  };
};

// --- Get User By Id
export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    return { success: false, statusCode: 404, message: "User not found" };
  }

  return {
    success: true,
    data: user,
  };
};

// --- Update User
export const updateUserByIdService = async (
  id: string,
  data: UserUpdateDto,
) => {
  // --- Hash password if provided
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  );

  if (!updatedUser) {
    return { success: false, statusCode: 404, message: "User not found" };
  }

  return {
    success: true,
    data: updatedUser,
  };
};

// --- Delete User
export const deleteUserByIdService = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return { success: false, statusCode: 404, message: "User not found" };
  }

  return {
    success: true,
    data: { message: "User has been deleted successfully" },
  };
};
