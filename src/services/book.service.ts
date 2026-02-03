// --- Model
import Book from "../models/Book.js";

// --- Validations
import type {BookDto} from "../validations/book.validation.js";
import type {BookQueryDto} from "../validations/query.validation.js";

// --- Helpers
import {queryOperations} from "../helpers/query.helper.js";
import {notFoundResponse, successResponse} from "../helpers/response.helper.js";

// --- Get All Books with Filtering & Pagination Service
export const getAllBooksService = async (queryParams: BookQueryDto) => {
  const {minPrice, maxPrice, page} = queryParams;

  const limit = Number(process.env.BOOKS_PER_PAGE) || 2;

  // --- Filtering Logic
  let filter: any = {};
  if (minPrice !== undefined) filter.price = {$gte: minPrice};
  if (maxPrice !== undefined) filter.price = {...filter.price, $lte: maxPrice};

  // --- Population Options
  const populate = {
    path: "authorId",
    select: ["firstName", "lastName", "nationality", "image"],
  };

  // --- Query Operations
  const result = await queryOperations(Book, {
    page: page || 1,
    limit,
    filter,
    populate,
  });
  return successResponse(result);
};

// --- Get Book By Id Service
export const getBookByIdService = async (id: string) => {
  const book = await Book.findById(id).populate("authorId", [
    "firstName",
    "lastName",
    "nationality",
    "image",
  ]);

  if (!book) {
    return notFoundResponse("Book");
  }

  return successResponse(book);
};

// --- Create New Book Service
export const createNewBookService = async (data: BookDto) => {
  const book = await Book.create(data);
  return successResponse(book);
};

// --- Update Book By Id Service
export const updateBookByIdService = async (id: string, data: BookDto) => {
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    {$set: data},
    {new: true},
  ).populate("authorId", ["firstName", "lastName", "nationality", "image"]);

  if (!updatedBook) {
    return notFoundResponse("Book");
  }
  return successResponse(updatedBook);
};

// --- Delete Book By Id Service
export const deleteBookByIdService = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return notFoundResponse("Book");
  }

  return successResponse({message: "Book has been deleted"});
};
