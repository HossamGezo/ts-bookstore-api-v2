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

/**
 * @swagger
 * /password/forgot-password:
 *   get:
 *     summary: Get Forgot Password View
 *     description: Renders the HTML page where users can enter their email to request a password reset link.
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Renders forgot-password.ejs
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>...</html>"
 *
 *   post:
 *     summary: Send Forgot Password Link
 *     description: Validates the email, generates a unique reset token, and sends a reset link via email using Nodemailer.
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Success - Renders link-send.ejs (Confirmation page).
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
PasswordRouter.route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

/**
 * @swagger
 * /password/reset-password/{id}/{token}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The User's unique Object ID.
 *     - in: path
 *       name: token
 *       required: true
 *       schema:
 *         type: string
 *       description: The unique reset token sent to the user's email.
 *
 *   get:
 *     summary: Get Reset Password View
 *     description: Validates the reset token and user ID. If valid, renders the password reset HTML page.
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Success - Renders reset-password.ejs.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   post:
 *     summary: Reset Password
 *     description: Validates the new password and the token. If everything is correct, updates the user's password in the database.
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Success - Renders success-password.ejs.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
PasswordRouter.route("/reset-password/:id/:token")
  .get(validateObjectId, getResetPasswordView)
  .post(validateObjectId, resetPassword);

export default PasswordRouter;
