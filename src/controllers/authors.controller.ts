// --- Libraries
import type {Request, Response} from "express";
import asyncHandler from "express-async-handler";

// --- Model
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
    // --- Pagination Logic
    const {pageNumber} = req.query;
    const page = parseInt(pageNumber as string) || 1;
    const authorsPerPage = 2;
    const skip = (page - 1) * authorsPerPage;
    
    const [authors, totalAuthors] = await Promise.all([
      Author.find().skip(skip).limit(authorsPerPage).sort({firstName: 1}),
      Author.countDocuments(),
    ]);

    // --- Response
    res.status(200).json({
      authors,
      totalAuthors,
      currentPage: page,
      totalPages: Math.ceil(totalAuthors / authorsPerPage),
    });
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
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json({message: "Author not found"});
      return;
    }

    // --- Response
    res.status(200).json(author);
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
    // --- Zod Validation
    const validate = validateAuthor(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.issues[0]?.message});
      return;
    }

    // --- Mongo Validation
    const newAuthor = new Author(validate.data);

    // --- Inject Author to database
    const result = await newAuthor.save();

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
    // --- Zod Validation
    const validate = validateAuthor(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.issues[0]?.message});
      return;
    }

    // --- Update Author Logic
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {$set: validate.data},
      {new: true},
    );

    if (!updatedAuthor) {
      res.status(404).json({message: "Author not found"});
      return;
    }

    // --- Response
    res.status(200).json(updatedAuthor);
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
    // --- Check Existence
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      res.status(404).json({message: "Author not found"});
      return;
    }

    // --- Response
    res.status(200).json({message: "Author has been deleted"});
    return;
  },
);
