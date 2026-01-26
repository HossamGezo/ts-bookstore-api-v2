// --- Libraries
import type {Request, Response} from "express";
import asyncHandler from "express-async-handler";

// --- Model
import Book, {validateBook, validateQuerySchema} from "../models/Book.js";

// --- HTTP Methods (Verbs)

/**
 * @desc Get All Books
 * @route /api/books
 * @method GET
 * @access public
 */
export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  // --- Zod Validation
  const validate = validateQuerySchema(req.query);
  if (!validate.success) {
    res.status(400).json({message: validate.error.issues[0]?.message});
    return;
  }

  // --- Filtering Logic
  let query: any = {};
  const {minPrice, maxPrice} = validate.data;

  // Better Solution
  if (minPrice !== undefined) query.price = {$gte: minPrice};
  if (maxPrice !== undefined) query.price = {...query.price, $lte: maxPrice};

  // if (minPrice && maxPrice) {
  //   query = {price: {$gte: Number(minPrice), $lte: Number(maxPrice)}};
  // }

  // --- Get All Books
  const books = await Book.find(query).populate("authorId", [
    "firstName",
    "lastName",
    "nationality",
    "image",
  ]);

  // --- Response
  res.status(200).json(books);
  return;
});

/**
 * @desc Get Book By Id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id).populate("authorId", [
    "firstName",
    "lastName",
    "nationality",
    "image",
  ]);
  if (!book) {
    res.status(404).json({message: "Book not found"});
    return;
  }
  // --- Response
  res.status(200).json(book);
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
    // --- Zod Validation
    const validate = validateBook(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.issues[0]?.message});
      return;
    }

    // --- Mongo Validation
    const newBook = new Book(validate.data);

    // --- Inject Book to database
    const result = await newBook.save();

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
    // --- Zod Validation
    const validate = validateBook(req.body);
    if (!validate.success) {
      res.status(400).json({message: validate.error.issues[0]?.message});
      return;
    }

    // --- Update Book Logic
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {$set: validate.data},
      {new: true},
    ).populate("authorId", ["firstName", "lastName", "nationality", "image"]);

    if (!updatedBook) {
      res.status(404).json({message: "Book not found"});
      return;
    }

    // --- Response
    res.status(200).json(updatedBook);
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
    // --- Check Existence
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({message: "Book not Found"});
      return;
    }

    // --- Response
    res.status(200).json({message: "Book has been deleted"});
    return;
  },
);
