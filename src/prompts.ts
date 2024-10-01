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

async function viewEmployees() {
  const result =
    await db.query(`SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
          FROM employees e
          LEFT JOIN roles r ON e.role_id = r.id
          LEFT JOIN departments d ON r.department_id = d.id
          LEFT JOIN employees m ON e.manager_id = m.id`);
  console.table(result.rows);
}

async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the department:",
  });
  await db.query("INSERT INTO departments (name) VALUES ($1)", [name]);
}
