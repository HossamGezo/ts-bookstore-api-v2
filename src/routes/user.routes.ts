// --- Libraries
import express from "express";

// --- Users Controller Methods (Verbs)
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

// --- Local Middlewares
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

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
