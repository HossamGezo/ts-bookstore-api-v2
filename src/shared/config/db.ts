import mongoose from "mongoose";
import { globalSchemaPlugin } from "../helpers/mongoose.helper.js";

// Mongose plugin
mongoose.plugin(globalSchemaPlugin);

const connectToDB = async () => {
  // Ensure MONGO_URI exists (TypeScript safety check)
  const mongoUri =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO;
  if (!mongoUri) {
    console.error("MONGO_URI is missing!");
    process.exit(1);
  }
  try {
    // Initial attempt to connect to the database
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    /**
     * EVENT LISTENERS (For monitoring DB health after initial connection)
     */

    // 1. Monitor runtime errors after the connection is established
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    // 2. Alert when the database is disconnected (Mongoose will try to reconnect automatically)
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected! Reconnecting...");
    });
  } catch (error) {
    // Handle failures during the initial connection attempt
    console.error("Failed to connect to MongoDB!", error);
    process.exit(1);
  }
};

export default connectToDB;
