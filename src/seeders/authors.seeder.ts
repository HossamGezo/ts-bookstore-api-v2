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

// --- Seeding authors to database --- npm run seed:authors
const seedAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors has been seeded");
    process.exit(0);
  } catch (error) {
    console.error("Fail to insert authors to database", error);
    process.exit(1);
  }
};

// --- Deleting authors from database --- npm run delete:authors
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

/**
 * =============================
 *  Process.argv Explanation
 * =============================
 *
 * argv stands for "Argument Vector" – an array of command-line arguments.
 *
 * Original Node usage:
 *   node src/seeders/authors.seeder.ts -seed
 *   process.argv = [
 *     "node",                          // argv[0] → Node runtime
 *     "src/seeders/authors.seeder.ts", // argv[1] → executed file
 *     "-seed"                          // argv[2] → first argument
 *   ]
 *
 * Using npm scripts (TypeScript + ts-node):
 *   npm run seed:authors
 *   npm executes: node --loader ts-node/esm src/seeders/authors.seeder.ts -seed
 *   argv[2] still contains "-seed"
 *
 * Same for delete:
 *   npm run delete:authors → argv[2] = "-delete"
 */

// --- Excustion functions
if (process.argv[2] === "-seed") {
  // argv.includes("-seed")
  seedAuthors();
} else if (process.argv[2] === "-delete") {
  // argv.includes("-delete")
  deleteAuthors();
} else {
  console.error("Please run with '-seed' | '-delete'");
  process.exit(1);
}
