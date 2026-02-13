// --- Libraries
import { config } from "dotenv";

// --- Load environment variables from .env file
config();

// --- Local Data
import { books } from "./book.data.js";

// --- Local Files
import connectToDB from "../../shared/config/db.js";
import Book from "../../models/Book.js";
import Author from "../../models/Author.js";

// --- Connect to DB
connectToDB();

// --- Seeding books data to databse --- npm run seed:books
const seedBooks = async () => {
  try {
    // --- Get All Authors
    const authors = await Author.find();
    if (authors.length === 0) {
      console.log("No authors found! Please run 'npm run seed:authors' first.");
      process.exit(1);
    }

    // --- Delete current Books
    await Book.deleteMany();

    // --- Books with authors
    const booksWithAuthors = books.map((book) => {
      const author = authors.find(
        (author) =>
          `${author.firstName} ${author.lastName}` === book.authorName,
      );
      return {
        ...book,
        authorId: author?.id,
      };
    });

    // --- Insert books data Logic
    await Book.insertMany(booksWithAuthors);
    console.log("Books data has been seeded to database");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.error("Fail to insert books data to database", message);
    process.exit(1);
  }
};

// --- Deleting books from database --- npm run delete:books
const deleteBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books data has been deleted from database");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.error("Fail to delete Books data from database", message);
    process.exit(1);
  }
};

// --- Execute script based on CLI argument
if (process.argv[2] === "-seed") {
  seedBooks();
} else if (process.argv[2] === "-delete") {
  deleteBooks();
} else {
  console.error("Please run with '-seed' | '-delete'");
  process.exit(1);
}
