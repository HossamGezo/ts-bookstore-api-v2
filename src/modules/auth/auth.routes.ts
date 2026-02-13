// --- Libraries
import express from "express";

// --- Auth Controller Methods (Verbs)
import { loginUser, registerUser } from "./auth.controller.js";

// --- Router
const AuthRouter = express.Router();

// --- /api/auth/register
AuthRouter.route("/register").post(registerUser);

// --- /api/auth/login
AuthRouter.route("/login").post(loginUser);

export default AuthRouter;
