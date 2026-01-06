// --- Libraries
import type {Request, Response} from "express";
import asyncHandler from "express-async-handler";

// --- Models
import Author, {validateAuthor} from "../models/Author.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Get All Authors
 * @route /api/authors
 * @method GET
 * @access public
 */
export const getAllAuthors = asyncHandler(
  async (req: Request, res: Response) => {
    // Pagination Logic
    const {pageNumber} = req.query;
    const page = parseInt(pageNumber as string) || 1;
    const authorsPerPage = 2;
    const skip = (page - 1) * authorsPerPage;
    const authors = await Author.find().skip(skip).limit(authorsPerPage);
    res.status(200).json(authors);
    return;
  }
);

/**
 * @desc Get Author By Id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
export const getAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json({message: "Author not found"});
      return;
    }
    res.status(200).json(author);
    return;
  }
);

/**
 * @desc Create New Author
 * @route /api/author
 * @method POST
 * @access private (only admin)
 */
export const createNewAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    // --- Zod Validation
    const validate = validateAuthor(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.message});
      return;
    }

    // --- Create New Author
    const newAuthor = new Author(req.body);

    // --- Inject Author to database
    const result = await newAuthor.save();

    // --- Response
    res.status(201).json(result);
    return;
  }
);

/**
 * @desc Update Author
 * @route /api/author/:id
 * @method PUT
 * @access private (only admin)
 */
export const updateAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    // --- isExist Logic
    const isExist = await Author.findById(req.params.id);
    if (!isExist) {
      res.status(404).json({message: "Author Not Found"});
      return;
    }

    // --- Zod Validation
    const validate = validateAuthor(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.message});
      return;
    }

    // --- Update Author
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      {new: true}
    );

    // --- Response
    res.status(200).json(updatedAuthor);
  }
);

/**
 * @desc Delete Author
 * @route /api/author/:id
 * @method DELETE
 * @access private (only admin)
 */
export const deleteAuthorById = asyncHandler(
  async (req: Request, res: Response) => {
    // --- isExist Logic
    const isExist = await Author.findById(req.params.id);
    if (!isExist) {
      res.status(404).json({message: "Author Not Found"});
      return;
    }

    // --- Delete author from database
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Author has been deleted"});
    return;
  }
);
