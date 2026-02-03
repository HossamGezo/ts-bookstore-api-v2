// --- Libraries
import {z} from "zod";

// --- Email Schema
const EmailSchema = z
  .object({
    email: z.string().email({message: "Invalid Email Address"}).trim(),
  })
  .strict();

export type EmailSchemaDto = z.infer<typeof EmailSchema>;

// --- Password Schema
const PasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message:
          "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type PasswordSchemaDto = z.infer<typeof PasswordSchema>;

// --- Validation Functions

// - Validate Forgot Password
export const validateEmail = (obj: unknown) => {
  const validation = EmailSchema.safeParse(obj);
  return validation;
};

export const validatePassword = (obj: unknown) => {
  const validation = PasswordSchema.safeParse(obj);
  return validation;
};
