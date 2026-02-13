// --- Libraries
import express from "express";

// --- Middlewares
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../../shared/middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../../shared/middlewares/validateObjectId.middleware.js";

// --- Users Controller Methods (Verbs)
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./user.controller.js";

// --- UserRouter
const UserRouter = express.Router();

// --- /api/users
UserRouter.route("/").get(verifyTokenAndAdmin, getAllUsers);

// --- /api/users/:id
UserRouter.route("/:id")
  .get(validateObjectId, verifyTokenAndAuthorization, getUserById)
  .put(validateObjectId, verifyTokenAndAuthorization, updateUserById)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserById);

export default UserRouter;
