// --- Libraries
import express from "express";
import {config} from "dotenv";

// --- Database
import connectToDB from "./config/db.js";

// --- Router Files
import AuthorRouter from "./routes/authors.routes.js";
import BookRouter from "./routes/books.routes.js";

// --- Load environment variables from .env file
config();

// --- Init App
const app = express();

// --- Middlewares
app.use(express.json());

// --- Routers
app.use("/api/authors", AuthorRouter);
app.use("/api/books", BookRouter);

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
