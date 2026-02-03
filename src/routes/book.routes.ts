// --- Libraries
import express from "express";

// --- Books Controller Methods (Verbs)
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.js";

// --- Middlewares
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

// --- Router
const BookRouter = express.Router();

// --- /api/books
BookRouter.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

// --- /api/books/:id
BookRouter.route("/:id")
  .get(validateObjectId, getBookById)
  .put(validateObjectId, verifyTokenAndAdmin, updateBookById)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteBookById);

export default BookRouter;
