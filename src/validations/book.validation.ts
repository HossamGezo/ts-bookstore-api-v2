// --- Libraries
import mongoose from "mongoose";
import {z} from "zod";

// --- Book Schema
const BookSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, {message: "Book title must be at least 3 characters"})
      .max(100, {message: "Book title is too long"}),
    authorName: z
      .string()
      .trim()
      .min(3, {message: "Author Name must be at least 3 characters"})
      .max(20, {message: "Author Name must not exceed 20 characters"}),
    authorId: z
      .string()
      .trim()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid Author ID",
      }),
    description: z
      .string()
      .trim()
      .min(10, {message: "Book description must be at least 10 characters"})
      .max(500, {message: "Description can be up to 500 characters"}),
    price: z.number().min(0, {message: "Price cannot be less than 0"}),
    cover: z
      .string()
      .trim()
      .transform((val) => val.toLocaleLowerCase())
      .refine((val) => ["soft cover", "hard cover"].includes(val), {
        message: "Only 'soft cover' or 'hard cover' are supported",
      }),
  })
  .strict();

export type BookDto = z.infer<typeof BookSchema>;

// --- Validate Book Function
export const validateBook = (obj: unknown) => {
  return BookSchema.safeParse(obj);
};
