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
    email: z.string().email({message: "Invalid Email Address"}).trim(),
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
    confirmPassword: z.string().trim(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type UserRegisterDto = z.infer<typeof ZodUserRegisterSchema>;

// --- Zod User Login Schema
const ZodUserLoginSchema = z
  .object({
    email: z.string().email({message: "Invalid Email Address"}).trim(),
    password: z.string().min(1, {message: "Password is required"}),
  })
  .strict();
export type UserLoginDto = z.infer<typeof ZodUserLoginSchema>;

// --- Zod User Update Schema
const ZodUserUpdateSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, {message: "UserName must be at least 3 characters"})
      .max(20, {message: "UserName must not exceed 20 characters"})
      .optional(),
    email: z
      .string()
      .email({message: "Invalid Email Address"})
      .trim()
      .optional(),
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
      .min(8, {message: "Password must be at least 8 characters"})
      .optional(),
  })
  .strict();
export type UserUpdateDto = z.infer<typeof ZodUserUpdateSchema>;

// --- Zod User Change Password Schema
const ZodUserChangePasswordSchema = z
  .object({
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
export type UserChangePasswordDto = z.infer<typeof ZodUserChangePasswordSchema>;

// --- Zod Validation Functions

// - Validate Register Function
export const validateRegister = (obj: unknown) => {
  const validate = ZodUserRegisterSchema.safeParse(obj);
  return validate;
};

// - Validate Login Function
export const validateLogin = (obj: unknown) => {
  const validate = ZodUserLoginSchema.safeParse(obj);
  return validate;
};

// - Validate Update Function
export const validateUpdate = (obj: unknown) => {
  const validate = ZodUserUpdateSchema.safeParse(obj);
  return validate;
};

// - Validate Change Password
export const validateChangePassword = (obj: unknown) => {
  const validate = ZodUserChangePasswordSchema.safeParse(obj);
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
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", MongoUserSchema);
export default User;
