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

// --- Local Middlewares
import {verifyTokenAndAdmin} from "../middlewares/verifyToken.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

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
