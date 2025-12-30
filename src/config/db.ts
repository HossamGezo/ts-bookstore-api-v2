import mongoose from "mongoose";

const connectToDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing!");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Failed to connect to MongoDB!", error);
    process.exit(1);
  }
};

export default connectToDB;
