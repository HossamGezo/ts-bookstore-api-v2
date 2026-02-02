import Author from "../models/Author.js";
import { queryOperations } from "../helpers/query.helper.js";
import type { AuthorDto } from "../validations/author.validation.js";
import type { AuthorQueryDto } from "../validations/query.validation.js";

// --- Get All Authors with Pagination
export const getAllAuthorsService = async (queryParams: AuthorQueryDto) => {
  const { page } = queryParams;
  const limit = Number(process.env.AUTHORS_PER_PAGE) || 2;
  const result = await queryOperations(Author, {
    page: page || 1,
    limit,
    sort: { firstName: 1 },
  });
  return {
    success: true,
    data: result,
  };
};

// --- Get Author By Id
export const getAuthorByIdService = async (id: string) => {
  const author = await Author.findById(id);
  if (!author) {
    return { success: false, statusCode: 404, message: "Author not found" };
  }

  return { success: true, data: author };
};

// --- Create New Author
export const createNewAuthorService = async (data: AuthorDto) => {
  const author = await Author.create(data);
  return { success: true, data: author };
};

// --- Update Author By Id
export const updateAuthorByIdService = async (id: string, data: AuthorDto) => {
  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  );
  if (!updatedAuthor) {
    return { success: false, statusCode: 404, message: "Author not found" };
  }

  return { success: true, data: updatedAuthor };
};

// --- Delete Author By Id
export const deleteAuthorByIdService = async (id: string) => {
  const author = await Author.findByIdAndDelete(id);
  if (!author) {
    return { success: false, statusCode: 404, message: "Author not found" };
  }

  return { success: true, data: { message: "Author has been deleted" } };
};
