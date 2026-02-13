// --- Libraries
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// --- Model
import User from "../../models/User.js";

// --- Types
import type { EmailSchemaDto } from "./password.validation.js";
import {
  failureResponse,
  notFoundResponse,
  successResponse,
} from "../../shared/helpers/response.helper.js";

// --- Send Forgot Password Link Service
export const sendForgotPasswordLinkService = async (data: EmailSchemaDto) => {
  // --- Existence
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return notFoundResponse("user");
  }

  // --- Token
  const secret = process.env.JWT_SECRET_KEY! + user.password;
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: (process.env.PASSWORD_RESET_EXPIRES_IN! as any) || "10m",
  });

  // --- Link
  const link = `${process.env.BASE_URL}/password/reset-password/${user.id}/${token}`;

  /* 
      1. First Solution
      --- Response
      res.json({message: "Click on the link", resetPasswordLink: link});
    */

  // 2. More Professional Solution
  // --- Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL, // sender: "me@gmail.com"
      pass: process.env.USER_PASS, // sender: app password
    },
  });
  const mailOptions = {
    from: process.env.USER_EMAIL, // sender: "me@gmail.com"
    to: user.email, // receiver
    subject: "Reset Password",
    html: `<div>
                <h3>Click on the link below to reset your password</h3>
                <p>${link}</p>
            </div>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return successResponse({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return failureResponse({
      statusCode: 500,
      message: "Failed to send email. Please try again later.",
    });
  }
};

// --- Get Reset Password View Service
export const getResetPasswordViewService = async (
  id: string,
  token: string,
) => {
  // --- Existence
  const user = await User.findById(id);
  if (!user) {
    return notFoundResponse("User");
  }

  // --- Verify Token
  const secret = process.env.JWT_SECRET_KEY! + user.password;
  try {
    jwt.verify(token!, secret);
    return successResponse({ email: user.email });
  } catch (error: any) {
    return failureResponse({ message: error.message });
  }
};

// --- Reset Password Service
export const resetPasswordService = async (
  id: string,
  token: string,
  password: string,
) => {
  // --- Existence
  const user = await User.findById(id);
  if (!user) {
    return notFoundResponse("User");
  }

  // --- Verify Token
  const secret = process.env.JWT_SECRET_KEY! + user.password;
  try {
    jwt.verify(token!, secret);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return successResponse({ message: "Password has been reset successfully" });
  } catch (error: any) {
    return failureResponse({ message: error.message });
  }
};
