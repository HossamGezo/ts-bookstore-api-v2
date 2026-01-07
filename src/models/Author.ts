import mongoose from "mongoose";
import {z} from "zod";

// --- Zod Author Schema
const ZodAuthorSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, {message: "firstName must be at least 3 characters"})
    .max(20, {message: "firstName must not exceed 20 characters"}),
  lastName: z
    .string()
    .trim()
    .min(3, {message: "lastName must be at least 3 characters"})
    .max(20, {message: "lastName must not exceed 20 characters"}),
  nationality: z
    .string()
    .trim()
    .min(3, {message: "nationality must be at least 3 characters"})
    .max(20, {message: "nationality must not exceed 20 characters"}),
  image: z.string().default("default-image.png"),
});

export type ZodAuthorSchemaProps = z.infer<typeof ZodAuthorSchema>;

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
      minLength: [3, "firstName must be at least 3 characters"],
      maxLength: [20, "firstName must not exceed 20 characters"],
      index: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minLength: [3, "lastName must be at least 3 characters"],
      maxLength: [20, "lastName must not exceed 20 characters"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
      minLength: [3, "nationality must be at least 3 characters"],
      maxLength: [20, "nationality must not exceed 20 characters"],
    },
    image: {
      type: String,
      default: "default-image.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", MongoAuthorSchema);
export default Author;
