// --- Libraries
import express from "express";

// --- Auth Controller Methods (Verbs)
import { loginUser, registerUser } from "../controllers/auth.controller.js";

// --- Router
const AuthRouter = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: Create a new account in the system and return the user profile along with a JWT token for immediate authentication.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 */
AuthRouter.route("/register").post(registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user using email and password. Returns user data and a JWT token if credentials are valid.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
AuthRouter.route("/login").post(loginUser);

export default AuthRouter;
