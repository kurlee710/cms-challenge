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

async function addRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter the department ID for the role:",
    },
  ]);
  await db.query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    [title, salary, department_id]
  );
}

async function addEmployee() {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the employee's role ID:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the employee's manager ID (leave blank if none):",
    },
  ]);
  await db.query(
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, role_id, manager_id || null]
  );
}

async function updateEmployeeRole() {
  const employeesResult = await db.query("SELECT * FROM employees");
  const employees: Employee[] = employeesResult.rows;

  const { employee_id, new_role_id } = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select an employee to update:",
      choices: employees.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      })),
    },
    {
      type: "input",
      name: "new_role_id",
      message: "Enter the new role ID for the employee:",
    },
  ]);

  await db.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
    new_role_id,
    employee_id,
  ]);
}
