// --- Libraries
import express from "express";

// --- Password Controller Methods (Verbs)
import {
  getForgotPasswordView,
  getResetPasswordView,
  resetPassword,
  sendForgotPasswordLink,
} from "../controllers/password.controller.js";

// --- Middlewares
import {validateObjectId} from "../middlewares/validateObjectId.middleware.js";

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
