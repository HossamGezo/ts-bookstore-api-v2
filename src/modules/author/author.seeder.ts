// --- Libraries
import { config } from "dotenv";

// --- Load environment variables from .env file
config();

// --- Local Data
import { authors } from "./author.data.js";

// --- Local Files
import connectToDB from "../../shared/config/db.js";
import Author from "../../models/Author.js";

// --- Connect to DB
connectToDB();

// --- Seeding authors data to database --- npm run seed:authors
const seedAuthors = async () => {
  try {
    // --- Delete current authors
    await Author.deleteMany();

    // --- Seed authors Logic
    await Author.insertMany(authors);
    console.log("Authors data has been seeded to database");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.error("Fail to insert authors data to database", message);
    process.exit(1);
  }
};

// --- Deleting authors data from database --- npm run delete:authors
const deleteAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Authors data has been deleted");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.error("Fail to delete authors data from database", message);
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

// --- Execute script based on CLI argument
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
