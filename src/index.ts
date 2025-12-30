// --- Libraries
import express from "express";
import {config} from "dotenv";

// --- Local Files
import connectToDB from "./config/db.js";

// --- Load environment variables from .env file
config();

// --- Init App
const app = express();

// --- Middlewares
app.use(express.json());

// --- Server
const PORT = process.env.PORT || 8000;
connectToDB().then(() =>
  app.listen(PORT, () =>
    console.log(
      `Server is running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT} `
    )
  )
);
