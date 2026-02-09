// --- Libraries
import express from "express";

// --- Middlewares
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

// --- Books Controller Methods (Verbs)
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.js";

// --- Router
const BookRouter = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with filtering and pagination
 *     description: Fetch a paginated list of books from the catalog. You can filter the results by minimum and maximum price. Each book entry includes populated author details.
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter books with price greater than or equal to this value.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter books with price less than or equal to this value.
 *     responses:
 *       200:
 *         description: Success. Returns a list of books with pagination metadata.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessBooksList'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *
 *   post:
 *     summary: Create new book
 *     description: Add a new book to the bookstore. Access restricted to Admin users only (requires valid token).
 *     tags: [Book]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookRequest'
 *     responses:
 *       201:
 *         description: Created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleBookResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
BookRouter.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

/**
 * @swagger
 * /api/books/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The unique Object ID of the book.
 *
 *   get:
 *     summary: Get book by ID (Populated with Author)
 *     description: Retrieve detailed information about a single book, including the full details of its author (firstName, lastName, etc.) through MongoDB population.
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: Success. Returns the detailed book object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleBookResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   put:
 *     summary: Update book by ID
 *     description: Update the details of an existing book. Only Admin users can perform this action.
 *     tags: [Book]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookRequest'
 *     responses:
 *       200:
 *         description: Updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleBookResponse'
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
 *     summary: Delete book by ID
 *     description: Permanently remove a book from the database by its ID. Restricted to Admin users only.
 *     tags: [Book]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Deleted successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
BookRouter.route("/:id")
  .get(validateObjectId, getBookById)
  .put(validateObjectId, verifyTokenAndAdmin, updateBookById)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteBookById);

export default BookRouter;
