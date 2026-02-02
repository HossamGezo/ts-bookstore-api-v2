import Book from "../models/Book.js";
import { queryOperations } from "../helpers/query.helper.js";
import type { BookDto } from "../validations/book.validation.js";
import type { BookQueryDto } from "../validations/query.validation.js";

// --- Get All Books with Filtering & Pagination
export const getAllBooksService = async (queryParams: BookQueryDto) => {
  const { minPrice, maxPrice, page } = queryParams;

  const limit = Number(process.env.BOOKS_PER_PAGE) || 2;

  // --- Filtering Logic
  let filter: any = {};
  if (minPrice !== undefined) filter.price = { $gte: minPrice };
  if (maxPrice !== undefined)
    filter.price = { ...filter.price, $lte: maxPrice };

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

  return {
    success: true,
    data: result,
  };
};

// --- Get Book By Id
export const getBookByIdService = async (id: string) => {
  const book = await Book.findById(id).populate("authorId", [
    "firstName",
    "lastName",
    "nationality",
    "image",
  ]);

  if (!book) {
    return { success: false, statusCode: 404, message: "Book not found" };
  }

  return { success: true, data: book };
};

// --- Create New Book
export const createNewBookService = async (data: BookDto) => {
  const newBook = new Book(data);
  const result = await newBook.save();
  return { success: true, data: result };
};

// --- Update Book By Id
export const updateBookByIdService = async (id: string, data: BookDto) => {
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  ).populate("authorId", ["firstName", "lastName", "nationality", "image"]);

  if (!updatedBook) {
    return { success: false, statusCode: 404, message: "Book not found" };
  }

  return { success: true, data: updatedBook };
};

// --- Delete Book By Id
export const deleteBookByIdService = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return { success: false, statusCode: 404, message: "Book not found" };
  }

  return { success: true, data: { message: "Book has been deleted" } };
};
