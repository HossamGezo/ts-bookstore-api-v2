// --- Libraries
import {z} from "zod";

// --- User Register Schema
const UserRegisterSchema = z
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
export type UserRegisterDto = z.infer<typeof UserRegisterSchema>;

// --- User Login Schema
const UserLoginSchema = z
  .object({
    email: z.string().email({message: "Invalid Email Address"}).trim(),
    password: z.string().min(1, {message: "Password is required"}),
  })
  .strict();
export type UserLoginDto = z.infer<typeof UserLoginSchema>;

// --- User Update Schema
const UserUpdateSchema = z
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
export type UserUpdateDto = z.infer<typeof UserUpdateSchema>;

// --- User Change Password Schema
const UserChangePasswordSchema = z
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
export type UserChangePasswordDto = z.infer<typeof UserChangePasswordSchema>;

// --- Validation Functions

// - Validate Register Function
export const validateRegister = (obj: unknown) => {
  const validate = UserRegisterSchema.safeParse(obj);
  return validate;
};

// - Validate Login Function
export const validateLogin = (obj: unknown) => {
  const validate = UserLoginSchema.safeParse(obj);
  return validate;
};

// - Validate Update Function
export const validateUpdate = (obj: unknown) => {
  const validate = UserUpdateSchema.safeParse(obj);
  return validate;
};

// - Validate Change Password
export const validateChangePassword = (obj: unknown) => {
  const validate = UserChangePasswordSchema.safeParse(obj);
  return validate;
};
