// src/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
  user: process.env.DB_USER || "your_default_db_user", // Use the DB_USER environment variable
  host: "localhost",
  database: process.env.DB_NAME || "your_default_db_name", // Use the DB_NAME environment variable
  password: process.env.DB_PASSWORD || "", // Use the DB_PASSWORD environment variable
  port: 5432,
});
