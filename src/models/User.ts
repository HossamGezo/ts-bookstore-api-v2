// --- Libraries
import mongoose from "mongoose";
import {z} from "zod";

// --- Zod User Register Schema
const ZodUserRegisterSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, {message: "UserName must be at least 3 characters"})
      .max(20, {message: "UserName must not exceed 20 characters"}),
    email: z
      .string()
      .trim()
      .regex(/^\S+@\S+\.\S+$/, {message: "Invalid Email Address"}),
    password: z
      .string()
      .trim()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/\W/, {
        message: "Password must contain at least one special character",
      })
      .min(8, {message: "Password must be at least 8 characters"}),
  })
  .strict();
export type ZodUserRegisterProps = z.infer<typeof ZodUserRegisterSchema>;

// --- Zod User Login Schema
const ZodUserLoginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .regex(/^\S+@\S+\.\S+$/, {message: "Invalid Email Address"}),
    password: z
      .string()
      .trim()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/\W/, {
        message: "Password must contain at least one special character",
      })
      .min(8, {message: "Password must be at least 8 characters"}),
  })
  .strict();
export type ZodUserLoginProps = z.infer<typeof ZodUserLoginSchema>;

// --- Zod User Update Schema
const ZodUserUpdateSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, {message: "UserName must be at least 3 characters"})
      .max(20, {message: "UserName must not exceed 20 characters"}),
    email: z
      .string()
      .trim()
      .regex(/^\S+@\S+\.\S+$/, {message: "Invalid Email Address"}),
    password: z
      .string()
      .trim()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/\W/, {
        message: "Password must contain at least one special character",
      })
      .min(8, {message: "Password must be at least 8 characters"}),
  })
  .strict();
export type ZodUserUpdateProps = z.infer<typeof ZodUserUpdateSchema>;

// --- Zod Validation Functions

// - Validate Login Function
export const validateLogin = (obj: unknown) => {
  const validate = ZodUserLoginSchema.safeParse(obj);
  return validate;
};

// - Validate Register Function
export const validateRegister = (obj: unknown) => {
  const validate = ZodUserRegisterSchema.safeParse(obj);
  return validate;
};

// - Validate Update Function
export const validateUpdate = (obj: unknown) => {
  const validate = ZodUserUpdateSchema.safeParse(obj);
  return validate;
};

// --- Mongo User Schema
const MongoUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "UserName must be at least 3 characters"],
      maxLength: [20, "UserName must not exceed 20 characters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid Email Address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "Password must be at least 8 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", MongoUserSchema);
export default User;
