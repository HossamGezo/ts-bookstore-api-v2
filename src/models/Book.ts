// --- Libraries
import mongoose from "mongoose";

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
      minLength: [10, "Book description must be at least 10 characters"],
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
  },
);

const Book = mongoose.model("Book", MongoBookSchema);

export default Book;
