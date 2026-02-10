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

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     description: Retrieve a paginated list of all authors available in the bookstore. Access is public.
 *     tags: [Author]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: A paginated list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessAuthorsList'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *
 *   post:
 *     summary: Create new author
 *     description: Add a new author to the database. Access restricted to Admin users only (requires valid token).
 *     tags: [Author]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorRequest'
 *     responses:
 *       201:
 *         description: Author created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleAuthorResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
AuthorRouter.route("/")
  .get(getAllAuthors)
  .post(verifyTokenAndAdmin, createNewAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The unique ID of the author.
 *
 *   get:
 *     summary: Get author by ID
 *     description: Retrieve detailed information about a specific author using their unique Object ID.
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: Author details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleAuthorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   put:
 *     summary: Update author by ID
 *     description: Modify the existing information of an author. Access restricted to Admin users only.
 *     tags: [Author]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorRequest'
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleAuthorResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   delete:
 *     summary: Delete author by ID
 *     description: Permanently remove an author from the database using their ID. Access restricted to Admin users only.
 *     tags: [Author]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/DeleteSuccess'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
AuthorRouter.route("/:id")
  .get(validateObjectId, getAuthorById)
  .put(validateObjectId, verifyTokenAndAdmin, updateAuthorById)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteAuthorById);

export default AuthorRouter;
