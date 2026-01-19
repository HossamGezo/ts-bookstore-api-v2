// --- Libraries
import mongoose from "mongoose";
import {z} from "zod";

// --- Zod Book Schema
const ZodBookSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, {message: "Book title must be at least 5 characters"})
      .max(100, {message: "Book title is too long"}),
    authorName: z
      .string()
      .trim()
      .min(3, {message: "Author Name must be at least 3 characters"})
      .max(20, {message: "Author Name must not exceed 20 characters"}),
    authorId: z.string().length(24, {message: "Invalid Author ID"}),
    description: z
      .string()
      .trim()
      .min(10, {message: "Book description must be at least 20 characters"})
      .max(500, {message: "Description can be up to 500 characters"}),
    price: z.number().min(0, {message: "Price cannot be less than 0"}),
    cover: z
      .string()
      .transform((val) => val.toLocaleLowerCase())
      .refine((val) => ["soft cover", "hard cover"].includes(val), {
        message: "Only 'soft cover' or 'hard cover' are supported",
      }),
  })
  .strict();

export type ZodBookProps = z.infer<typeof ZodBookSchema>;

// --- Validate Book Function
export const validateBook = (obj: unknown) => {
  return ZodBookSchema.safeParse(obj);
};

// --- Mongo Book Schema
const MongoBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Book title must be at least 3 characters"],
      maxLength: [100, "Book title is too long"],
      index: true,
    },
    authorName: {
      type: String,
      required: [true, "Author Name is required"],
      trim: true,
      minLength: [3, "Author Name must be at least 3 characters"],
      maxLength: [20, "Author Name must not exceed 20 characters"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Author is required"],
      ref: "Author",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [10, "Book description must be at least 20 characters"],
      maxLength: [500, "Description can be up to 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
      min: [0, "Price cannot be less than 0"],
    },
    cover: {
      type: String,
      required: [true, "Cover is Required"],
      lowercase: true,
      enum: {
        values: ["soft cover", "hard cover"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", MongoBookSchema);

export default Book;
