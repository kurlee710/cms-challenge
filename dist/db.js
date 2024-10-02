"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const pool = new pg_1.Pool({
    user: process.env.DB_USER || "your_default_db_user", // Use the DB_USER environment variable
    host: "localhost",
    database: process.env.DB_NAME || "your_default_db_name", // Use the DB_NAME environment variable
    password: process.env.DB_PASSWORD || "", // Use the DB_PASSWORD environment variable
    port: 5432,
});
const query = (text, params) => pool.query(text, params);
exports.default = {
    query,
};
//# sourceMappingURL=db.js.map