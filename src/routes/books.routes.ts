// --- Libraries
import express from "express";

// --- Books Controller Methods (Verbs)
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/books.controller.js";

// --- Router
const BookRouter = express.Router();

// --- /api/books
BookRouter.route("/").get(getAllBooks).post(createNewBook);

// --- /api/books/:id
BookRouter.route("/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);

export default BookRouter;
