// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Validations
import { validateBook, type BookDto } from "../validations/book.validation.js";
import { BookQuerySchema } from "../validations/query.validation.js";

// --- Services
import {
  createNewBookService,
  deleteBookByIdService,
  getAllBooksService,
  getBookByIdService,
  updateBookByIdService,
} from "../services/book.service.js";

// --- Types
import type { ServiceResult } from "../types/service.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Get All Books
 * @route /api/books
 * @method GET
 * @access public
 */
export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  // --- Validation
  const validation = BookQuerySchema.safeParse(req.query);
  if (!validation.success) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: validation.error.issues[0]?.message,
    });
    return;
  }

  // ---- Get All Books Service
  const result = (await getAllBooksService(validation.data)) as ServiceResult;

  // --- Response
  res.status(200).json(result);
  return;
});

/**
 * @desc Get Book By Id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const result = (await getBookByIdService(
    req.params.id!,
  )) as ServiceResult<BookDto>;

  if (!result.success) {
    res.status(result.statusCode!).json(result);
    return;
  }

  // --- Response
  res.status(200).json(result);
  return;
});

/**
 * @desc Create New Book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
export const createNewBook = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateBook(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: validation.error.issues[0]?.message,
      });
      return;
    }

    // --- Create New Book Service
    const result = (await createNewBookService(
      validation.data,
    )) as ServiceResult;

    // --- Response
    res.status(201).json(result);
    return;
  },
);

/**
 * @desc Update Book
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
export const updateBookById = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateBook(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: validation.error.issues[0]?.message,
      });
      return;
    }

    const result = (await updateBookByIdService(
      req.params.id!,
      validation.data,
    )) as ServiceResult;

    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);

/**
 * @desc Delete Book
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
export const deleteBookById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = (await deleteBookByIdService(
      req.params.id!,
    )) as ServiceResult<{ message: string }>;

    if (!result.success) {
      res.status(result.statusCode!).json(result);
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);
