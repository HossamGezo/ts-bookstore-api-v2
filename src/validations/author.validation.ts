// --- Libraries
import { z } from "zod";

// --- Author Schema
const AuthorSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, { message: "FirstName must be at least 3 characters" })
      .max(20, { message: "FirstName must not exceed 20 characters" }),
    lastName: z
      .string()
      .trim()
      .min(3, { message: "LastName must be at least 3 characters" })
      .max(20, { message: "LastName must not exceed 20 characters" }),
    nationality: z
      .string()
      .trim()
      .min(3, { message: "Nationality must be at least 3 characters" })
      .max(20, { message: "Nationality must not exceed 20 characters" }),
    image: z.string().default("default-image.png"),
  })
  .strict();

export type AuthorDto = z.infer<typeof AuthorSchema>;

// --- Validate Function
export const validateAuthor = (obj: unknown) => {
  return AuthorSchema.safeParse(obj);
};
