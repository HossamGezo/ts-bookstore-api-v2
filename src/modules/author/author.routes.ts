// --- Libraries
import express from "express";

// --- Middlewares
import { verifyTokenAndAdmin } from "../../shared/middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../../shared/middlewares/validateObjectId.middleware.js";

// --- Authors Controller Methods (Verbs)
import {
  createNewAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
} from "./author.controller.js";

// --- Router
const AuthorRouter = express.Router();

// --- /api/authors
AuthorRouter.route("/")
  .get(getAllAuthors)
  .post(verifyTokenAndAdmin, createNewAuthor);

// --- /api/authors/:id
AuthorRouter.route("/:id")
  .get(validateObjectId, getAuthorById)
  .put(validateObjectId, verifyTokenAndAdmin, updateAuthorById)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteAuthorById);

export default AuthorRouter;
