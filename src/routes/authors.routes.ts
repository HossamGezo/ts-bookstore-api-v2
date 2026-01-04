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
const router = express.Router();

// --- /api/authors
router.route("/").get(getAllAuthors).post(createNewAuthor);

// --- /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(updateAuthorById)
  .delete(deleteAuthorById);

export default router;
