// --- Libraries
import mongoose from "mongoose";

// --- Mongo User Schema
const MongoUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "UserName must be at least 3 characters"],
      maxLength: [20, "UserName must not exceed 20 characters"],
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    // Note: not best practice ... best practice at mongoose.helper.ts
    // toJSON: {
    //   transform: (_doc, ret: any) => {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
    // toObject: {
    //   transform: (_doc, ret: any) => {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
  },
);

const User = mongoose.model("User", MongoUserSchema);
export default User;
