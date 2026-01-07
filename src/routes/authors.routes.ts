// --- Libraries
import express from "express";

// --- Authors Controller Methods (Verbs)
import {
  createNewAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
} from "../controllers/authors.controller.js";

// --- Router
const AuthorRouter = express.Router();

// --- /api/authors
AuthorRouter.route("/").get(getAllAuthors).post(createNewAuthor);

// --- /api/authors/:id
AuthorRouter
  .route("/:id")
  .get(getAuthorById)
  .put(updateAuthorById)
  .delete(deleteAuthorById);

export default AuthorRouter;
