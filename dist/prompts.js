"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = mainMenu;
// src/prompts.ts
const inquirer_1 = __importDefault(require("inquirer"));
const db_1 = __importDefault(require("./db"));
function viewDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM departments");
        console.table(result.rows);
    });
}
function viewRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT r.id, r.title, r.salary, d.name AS department FROM roles r JOIN departments d ON r.department_id = d.id");
        console.table(result.rows);
    });
}
function viewEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
          FROM employees e
          LEFT JOIN roles r ON e.role_id = r.id
          LEFT JOIN departments d ON r.department_id = d.id
          LEFT JOIN employees m ON e.manager_id = m.id`);
        console.table(result.rows);
    });
}
function addDepartment() {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = yield inquirer_1.default.prompt({
            type: "input",
            name: "name",
            message: "Enter the name of the department:",
        });
        yield db_1.default.query("INSERT INTO departments (name) VALUES ($1)", [name]);
    });
}
function addRole() {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, salary, department_id } = yield inquirer_1.default.prompt([
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
        yield db_1.default.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
    });
}
function addEmployee() {
    return __awaiter(this, void 0, void 0, function* () {
        const { first_name, last_name, role_id, manager_id } = yield inquirer_1.default.prompt([
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
        yield db_1.default.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id || null]);
    });
}
function updateEmployeeRole() {
    return __awaiter(this, void 0, void 0, function* () {
        const employeesResult = yield db_1.default.query("SELECT * FROM employees");
        const employees = employeesResult.rows;
        const { employee_id, new_role_id } = yield inquirer_1.default.prompt([
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
        yield db_1.default.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
            new_role_id,
            employee_id,
        ]);
    });
}
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        });
        switch (action) {
            case "View all departments":
                yield viewDepartments();
                break;
            case "View all roles":
                yield viewRoles();
                break;
            case "View all employees":
                yield viewEmployees();
                break;
            case "Add a department":
                yield addDepartment();
                break;
            case "Add a role":
                yield addRole();
                break;
            case "Add an employee":
                yield addEmployee();
                break;
            case "Update an employee role":
                yield updateEmployeeRole();
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
        yield mainMenu();
    });
}
//# sourceMappingURL=prompts.js.map