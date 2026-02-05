// --- Libraries
import { z } from "zod";

// --- User Register Schema
const UserRegisterSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, { message: "UserName must be at least 3 characters" })
      .max(20, { message: "UserName must not exceed 20 characters" }),
    email: z.string().trim().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message:
          "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.",
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();
export type UserRegisterDto = z.infer<typeof UserRegisterSchema>;

// --- User Login Schema
const UserLoginSchema = z
  .object({
    email: z.string().trim().email({ message: "Invalid Email Address" }),
    password: z.string().trim().min(1, { message: "Password is required" }),
  })
  .strict();
export type UserLoginDto = z.infer<typeof UserLoginSchema>;

// --- User Update Schema
const UserUpdateSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, { message: "UserName must be at least 3 characters" })
      .max(20, { message: "UserName must not exceed 20 characters" })
      .optional(),
    email: z
      .string()
      .trim()
      .email({ message: "Invalid Email Address" })
      .optional(),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message:
          "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.",
      })
      .optional(),
  })
  .strict();
export type UserUpdateDto = z.infer<typeof UserUpdateSchema>;

// --- Validation Functions

// - Validate Register Function
export const validateRegister = (obj: unknown) => {
  const validation = UserRegisterSchema.safeParse(obj);
  return validation;
};

// - Validate Login Function
export const validateLogin = (obj: unknown) => {
  const validation = UserLoginSchema.safeParse(obj);
  return validation;
};

// - Validate Update Function
export const validateUpdate = (obj: unknown) => {
  const validation = UserUpdateSchema.safeParse(obj);
  return validation;
};
