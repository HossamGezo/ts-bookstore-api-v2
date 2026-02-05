// --- Libraries
import express from "express";

// --- Middlewares
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

// --- Password Controller Methods (Verbs)
import {
  getForgotPasswordView,
  getResetPasswordView,
  resetPassword,
  sendForgotPasswordLink,
} from "../controllers/password.controller.js";

// --- Router
const PasswordRouter = express.Router();

// --- /password/forgot-password
PasswordRouter.route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

// --- /password/reset-password/:id/:token
PasswordRouter.route("/reset-password/:id/:token")
  .get(validateObjectId, getResetPasswordView)
  .post(validateObjectId, resetPassword);

export default PasswordRouter;
