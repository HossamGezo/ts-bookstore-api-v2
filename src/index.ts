// --- Libraries
import express from "express";
import {config} from "dotenv";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import {serve, setup} from "swagger-ui-express";
// --- Security, Performance & Rate Limiting Middlewares
import compression from "compression"; // Optimizes performance by compressing response data (JSON/HTML) for faster delivery.
import hpp from "hpp"; // Enhances security by preventing HTTP ( HTTP Parameter Pollution ) Parameter Pollution attacks on query strings.
import {rateLimit} from "express-rate-limit"; // Protects the server from DDoS and Brute-force attacks by limiting

// --- Load environment variables from .env file
config();

// --- Configurations
import connectToDB from "./shared/config/db.js";
import swaggerSpec from "./shared/config/swagger.js";

// --- Helpers
import {setupLiveReload} from "./shared/helpers/livereload.helper.js";

// --- Middleware Files
import logger from "./shared/middlewares/logger.middleware.js";
import {
  errorHandler,
  notFound,
} from "./shared/middlewares/errors.middleware.js";

// --- Router Files
import AuthRouter from "./modules/auth/auth.routes.js";
import PasswordRouter from "./modules/password/password.routes.js";
import UserRouter from "./modules/user/user.routes.js";
import AuthorRouter from "./modules/author/author.routes.js";
import BookRouter from "./modules/book/book.routes.js";
import UploadRouter from "./modules/upload/upload.routes.js";

// --- Initialize App
const app = express();

// --- Trust Proxy (REQUIRED for Render/Cloud Deployment)
// This allows the Rate Limiter to see the real user's IP address instead of the server's proxy IP.
app.set("trust proxy", 1);

// --- Live Reload (DEV ONLY)
setupLiveReload(app);

// --- Performance Middleware (Compression)
// Should be at the top to compress all outgoing responses for faster data transfer.
app.use(compression());

// --- Request Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false})); // Allow Express to read form data from HTML forms

// --- Security Middlewares
// HPP: Prevents HTTP Parameter Pollution (e.g., sending multiple ?user=1&user=2).
app.use(hpp());

// Helmet: Security headers. Disable CSP in development to allow Swagger/LiveReload to function.
if (process.env.NODE_ENV === "development") {
  app.use(
    helmet({contentSecurityPolicy: false, crossOriginEmbedderPolicy: false}),
  );
} else {
  app.use(helmet());
}

// CORS: Define who can access your API.
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only That Domain Can Take Services From API
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// --- Rate Limiter: Prevent DDoS and Brute-force attacks by limiting requests per IP.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

// --- Apply rate limiting to all api & passwword routes
app.use("/api", limiter); 
app.use("/password", limiter);

// --- Logging Middleware
app.use(logger);

// --- View Engine & Static Folder Setup
app.use(express.static(path.join(process.cwd(), "public"))); // Expose the "public" folder to serve static assets
app.set("views", path.join(process.cwd(), "views")); // Tell Express where the views (EJS templates) live
app.set("view engine", "ejs");

// --- Swagger UI Route
app.use("/api-docs", serve, setup(swaggerSpec));

// --- API & MVC Routers
app.use("/api/auth", AuthRouter);
app.use("/password", PasswordRouter);
app.use("/api/users", UserRouter);
app.use("/api/authors", AuthorRouter);
app.use("/api/books", BookRouter);
app.use("/api/upload", UploadRouter);

// --- Global Error Handling
app.use(notFound);
app.use(errorHandler);

// --- Server Startup
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
