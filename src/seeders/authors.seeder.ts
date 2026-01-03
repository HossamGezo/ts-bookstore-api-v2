// --- Libraries
import {config} from "dotenv";

// --- Local Files
import Author from "../models/Author.js";
import {authors} from "../data/authors.data.js";
import connectToDB from "../config/db.js";

// --- Load environment variables from .env file
config();

// --- Connect to DB
connectToDB();

// --- Seeding authors to database
const seedAuthors = async () => {
  try {
    await Author.deleteMany();
    await Author.insertMany(authors);
    console.log("Authors has been seeded");
    process.exit(0);
  } catch (error) {
    console.error("Fail to insert authors to database", error);
    process.exit(1);
  }
};

// --- Removing authors from database
const deleteAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Authors has been deleted");
    process.exit(0);
  } catch (error) {
    console.error("Fail to delete authors from database", error);
    process.exit(1);
  }
};

// --- Excustion functions
if (process.argv[2] === "-seed") {
  // args.includes("-seed")
  seedAuthors();
} else if (process.argv[2] === "-delete") {
  // args.includes("-delete")
  deleteAuthors();
} else {
  console.error("Please run with '-seed' | '-delete'");
  process.exit(1);
}
