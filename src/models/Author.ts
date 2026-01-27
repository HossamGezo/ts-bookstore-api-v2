// --- Libraries
import mongoose from "mongoose";
import {z} from "zod";

// --- Zod Author Schema
const ZodAuthorSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, {message: "FirstName must be at least 3 characters"})
      .max(20, {message: "FirstName must not exceed 20 characters"}),
    lastName: z
      .string()
      .trim()
      .min(3, {message: "LastName must be at least 3 characters"})
      .max(20, {message: "LastName must not exceed 20 characters"}),
    nationality: z
      .string()
      .trim()
      .min(3, {message: "Nationality must be at least 3 characters"})
      .max(20, {message: "Nationality must not exceed 20 characters"}),
    image: z.string().default("default-image.png"),
  })
  .strict();

export type AuthorDto = z.infer<typeof ZodAuthorSchema>;

// --- Zod Validate Function
export const validateAuthor = (obj: unknown) => {
  return ZodAuthorSchema.safeParse(obj);
};

// --- Mongo Author Schema
const MongoAuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minLength: [3, "FirstName must be at least 3 characters"],
      maxLength: [20, "FirstName must not exceed 20 characters"],
      index: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minLength: [3, "LastName must be at least 3 characters"],
      maxLength: [20, "LastName must not exceed 20 characters"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
      minLength: [3, "Nationality must be at least 3 characters"],
      maxLength: [20, "Nationality must not exceed 20 characters"],
    },
    image: {
      type: String,
      default: "default-image.png",
    },
  },
  {
    timestamps: true,
  },
);

const Author = mongoose.model("Author", MongoAuthorSchema);
export default Author;
