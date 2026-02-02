// --- Libraries
import mongoose from "mongoose";

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
