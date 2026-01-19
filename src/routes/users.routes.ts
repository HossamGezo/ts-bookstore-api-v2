// --- Libraries
import express from "express";

// --- Users Controller Methods (Verbs)
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/users.controller.js";

// --- UserRouter
const UserRouter = express.Router();

// --- /api/users
UserRouter.route("/").get(getAllUsers);

// --- /api/users/:id
UserRouter.route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default UserRouter;
