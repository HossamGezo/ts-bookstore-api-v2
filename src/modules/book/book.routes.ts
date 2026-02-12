// --- Libraries
import express from "express";

// --- Middlewares
import { verifyTokenAndAdmin } from "../../shared/middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../../shared/middlewares/validateObjectId.middleware.js";

// --- Books Controller Methods (Verbs)
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "./book.controller.js";

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
