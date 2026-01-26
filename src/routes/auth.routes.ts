// --- Libraries
import express from "express";

// --- Auth Controller Methods (Verbs)
import {loginUser, registerUser} from "../controllers/auth.controller.js";

// --- Router
const AuthRouter = express.Router();

// --- /api/auth/register
AuthRouter.route("/register").post(registerUser);

// --- /api/auth/login
AuthRouter.route("/login").post(loginUser);

export default AuthRouter;
