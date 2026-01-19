// --- Libraries
import {config} from "dotenv";
import bcrypt from "bcryptjs";

// --- Load Environment Variables from .env file
config();

// --- Local data
import {users} from "../data/users.data.js";

// --- Local Files
import connectToDB from "../config/db.js";
import User from "../models/User.js";

// --- Connect To DB
connectToDB();

// --- Seeding users data to database --- npm run seed:users
const seedUsers = async () => {
  try {
    // --- Delete current users
    await User.deleteMany();

    // --- Hash users password
    const usersWithHash = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        return {...user, password: hash};
      })
    );

    // --- Seed users logic
    await User.insertMany(usersWithHash);
    console.log("Users has been seeded to database");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.error("Fail to insert users data to database", message);
    process.exit(1);
  }
};

// --- Deleting users data from database --- npm run delete:users
const deleteUsers = async () => {
  try {
    await User.deleteMany();
    console.log("Users has been deleted from database");
    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something Went Wrong!";
    console.log("Fail to delete users data from database", message);
    process.exit(1);
  }
};

// --- Excute functions using CLI commands
if (process.argv[2] === "-seed") {
  seedUsers();
} else if (process.argv[2] === "-delete") {
  deleteUsers();
} else {
  console.error("Please run with '-seed' or '-delete'");
}
