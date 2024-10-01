// src/prompts.ts
import inquirer from "inquirer";
import db from "./db";
import { Employee } from "./models";

async function viewDepartments() {
  const result = await db.query("SELECT * FROM departments");
  console.table(result.rows);
}

async function viewRoles() {
  const result = await db.query(
    "SELECT r.id, r.title, r.salary, d.name AS department FROM roles r JOIN departments d ON r.department_id = d.id"
  );
  console.table(result.rows);
}
