// src/prompts.ts
import inquirer from "inquirer";
import db from "./db";
import { Employee } from "./models";

async function viewDepartments() {
  const result = await db.query("SELECT * FROM departments");
  console.table(result.rows);
}
