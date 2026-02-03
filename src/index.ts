// --- Libraries
import express from "express";
import {config} from "dotenv";
import helmet from "helmet";
import cors from "cors";
import path from "path";

// --- Load environment variables from .env file
config();

// --- Database
import connectToDB from "./config/db.js";

// --- Middleware Files
import logger from "./middlewares/logger.middleware.js";
import {errorHandler, notFound} from "./middlewares/errors.middleware.js";

// --- Router Files
import AuthRouter from "./routes/auth.routes.js";
import PasswordRouter from "./routes/password.routes.js";
import UserRouter from "./routes/user.routes.js";
import AuthorRouter from "./routes/author.routes.js";
import BookRouter from "./routes/book.routes.js";

// --- Init App
const app = express();

// --- Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})); // Allow Express to read form data from HTML forms
app.use(logger);

// --- Helmet
app.use(helmet());

// --- Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only That Domain Can Take Services From API
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// --- View Engine & Static Folder Setup
app.use(express.static(path.join(process.cwd(), "public"))); // Expose the "public" folder to serve static assets
app.set("views", path.join(process.cwd(), "views")); // Tell Express where the views (EJS templates) live
app.set("view engine", "ejs");

// --- Routers
app.use("/api/auth", AuthRouter);
app.use("/password", PasswordRouter);
app.use("/api/users", UserRouter);
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
      } mode on port ${PORT}`,
    ),
  ),
);
