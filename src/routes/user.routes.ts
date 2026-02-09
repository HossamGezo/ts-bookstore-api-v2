// --- Libraries
import express from "express";

// --- Middlewares
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

// --- Users Controller Methods (Verbs)
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

// --- UserRouter
const UserRouter = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a paginated list of all users. Access restricted to Admin only.
 *     tags: [User]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUsersList'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
UserRouter.route("/").get(verifyTokenAndAdmin, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The user unique ID.
 *
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details. Access restricted to Admin or the user themselves.
 *     tags: [User]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   put:
 *     summary: Update user by ID
 *     description: Update user details (userName, email, or password). Access restricted to Admin or the user themselves.
 *     tags: [User]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user account. Access restricted to Admin or the user themselves.
 *     tags: [User]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
UserRouter.route("/:id")
  .get(validateObjectId, verifyTokenAndAuthorization, getUserById)
  .put(validateObjectId, verifyTokenAndAuthorization, updateUserById)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserById);

export default UserRouter;
