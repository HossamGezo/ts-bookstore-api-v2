// --- Libraries
import bcrypt from "bcryptjs";

// --- Models
import User from "../../models/User.js";

// --- Validations
import type { UserUpdateDto } from "./user.validation.js";
import type { UserQueryDto } from "../../shared/validations/query.validation.js";

// --- Helpers
import { queryOperations } from "../../shared/helpers/query.helper.js";
import {
  notFoundResponse,
  successResponse,
} from "../../shared/helpers/response.helper.js";

// --- Get All Users Service
export const getAllUsersService = async (queryParams: UserQueryDto) => {
  const { page } = queryParams;
  const limit = Number(process.env.USERS_PER_PAGE) || 5;
  const result = await queryOperations(User, { page: page || 1, limit });
  return result;
};

// --- Get User By Id Service
export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    return notFoundResponse("User");
  }
  return successResponse(user);
};

// --- Update User Service
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
    return notFoundResponse("User");
  }
  return successResponse(updatedUser);
};

// --- Delete User Service
export const deleteUserByIdService = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return notFoundResponse("User");
  }
  return successResponse({ message: "User has been deleted successfully" });
};
