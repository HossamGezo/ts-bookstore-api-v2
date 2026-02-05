// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// --- Validations
import {
  validateAuthor,
  type AuthorDto,
} from "../validations/author.validation.js";

// --- services
import {
  createNewAuthorService,
  deleteAuthorByIdService,
  getAllAuthorsService,
  getAuthorByIdService,
  updateAuthorByIdService,
} from "../services/author.service.js";
import { AuthorQuerySchema } from "../validations/query.validation.js";

// --- Types
import type { ServiceResult } from "../types/service.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Get All Authors
 * @route /api/authors
 * @method GET
 * @access public
 */
export const getAllAuthors = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = AuthorQuerySchema.safeParse(req.query);

    if (!validation.success) {
      res.status(400).json({ message: validation.error.issues[0]?.message });
      return;
    }

    const result = (await getAllAuthorsService(
      validation.data,
    )) as ServiceResult;

    // --- Response
    res.status(200).json(result);
    return;
  },
);

/**
 * @desc Get Author By Id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
export const getAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = (await getAuthorByIdService(
      req.params.id!,
    )) as ServiceResult;

    if (!result.success) {
      res.status(result.statusCode!).json({ message: result.message });
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);

/**
 * @desc Create New Author
 * @route /api/author
 * @method POST
 * @access private (only admin)
 */
export const createNewAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateAuthor(req.body);
    if (!validation.success) {
      res.status(400).json({ message: validation.error.issues[0]?.message });
      return;
    }

    // --- Inject Author to database
    const result = (await createNewAuthorService(
      validation.data,
    )) as ServiceResult<AuthorDto>;

    // --- Response
    res.status(201).json(result);
    return;
  },
);

/**
 * @desc Update Author
 * @route /api/author/:id
 * @method PUT
 * @access private (only admin)
 */
export const updateAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Validation
    const validation = validateAuthor(req.body);
    if (!validation.success) {
      res.status(400).json({ message: validation.error.issues[0]?.message });
      return;
    }

    // --- Update Author By Id service
    const result = (await updateAuthorByIdService(
      req.params.id!,
      validation.data,
    )) as ServiceResult<AuthorDto>;

    if (!result.success) {
      res.status(result.statusCode!).json({ message: result.message });
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);

/**
 * @desc Delete Author
 * @route /api/author/:id
 * @method DELETE
 * @access private (only admin)
 */
export const deleteAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = (await deleteAuthorByIdService(
      req.params.id!,
    )) as ServiceResult<{ message: string }>;

    if (!result.success) {
      res.status(result.statusCode!).json({ message: result.message });
      return;
    }

    // --- Response
    res.status(200).json(result);
    return;
  },
);
