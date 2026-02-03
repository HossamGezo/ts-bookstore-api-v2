// --- Models
import Author from "../models/Author.js";

// --- Validations
import type {AuthorDto} from "../validations/author.validation.js";
import type {AuthorQueryDto} from "../validations/query.validation.js";

// --- Helpers
import {queryOperations} from "../helpers/query.helper.js";
import {notFoundResponse, successResponse} from "../helpers/response.helper.js";

// --- Get All Authors with Pagination Service
export const getAllAuthorsService = async (queryParams: AuthorQueryDto) => {
  const {page} = queryParams;
  const limit = Number(process.env.AUTHORS_PER_PAGE) || 2;
  const result = await queryOperations(Author, {
    page: page || 1,
    limit,
    sort: {firstName: 1},
  });
  return successResponse(result);
};

// --- Get Author By Id Service
export const getAuthorByIdService = async (id: string) => {
  const author = await Author.findById(id);
  if (!author) {
    return notFoundResponse("Author");
  }

  return successResponse(author);
};

// --- Create New Author Service
export const createNewAuthorService = async (data: AuthorDto) => {
  const author = await Author.create(data);
  return successResponse(author);
};

// --- Update Author By Id Service
export const updateAuthorByIdService = async (id: string, data: AuthorDto) => {
  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    {$set: data},
    {new: true},
  );
  if (!updatedAuthor) {
    return notFoundResponse("Author");
  }

  return successResponse(updatedAuthor);
};

// --- Delete Author By Id Service
export const deleteAuthorByIdService = async (id: string) => {
  const author = await Author.findByIdAndDelete(id);
  if (!author) {
    return notFoundResponse("Author");
  }

  return successResponse({message: "Author has been deleted"});
};
