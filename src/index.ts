// --- Libraries
import express from "express";
import {config} from "dotenv";
import helmet from "helmet";
import cors from "cors";

// --- Load environment variables from .env file
config();

// --- Database
import connectToDB from "./config/db.js";

// --- Middleware Files
import logger from "./middlewares/logger.middleware.js";
import {errorHandler, notFound} from "./middlewares/errors.middleware.js";

// --- Router Files
import AuthorRouter from "./routes/authors.routes.js";
import BookRouter from "./routes/books.routes.js";

// --- Init App
const app = express();

// --- Middlewares
app.use(express.json());
app.use(logger);

// --- Helmet
app.use(helmet());

// --- Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only That Domain Can Take Services From API
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// --- Routers
app.use("/api/authors", AuthorRouter);
app.use("/api/books", BookRouter);

// --- Error Middlewares
app.use(notFound);
app.use(errorHandler);

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
