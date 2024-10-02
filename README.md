# Employee Database Management System

## Description

The **Employee Database Management System** is a command-line application designed to manage a company's employee database. It allows business owners to view and manage departments, roles, and employees effectively, making it easier to organize and plan their business operations. This application utilizes **Node.js**, **Inquirer (v8.2.4)**, and **PostgreSQL** to interact with and manage the data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/employee-database-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd employee-database-management-system
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Install **Inquirer (v8.2.4)**:

   ```bash
   npm i inquirer@8.2.4
   ```

5. Create a `.env` file in the root directory and configure your PostgreSQL connection settings:

   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   ```

6. Set up the PostgreSQL database using the provided schema (See [Database Schema](#database-schema)).

7. Start the application:
   ```bash
   npm start
   ```

## Usage

Upon starting the application, you will be presented with a list of options for managing departments, roles, and employees:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Select any of these options using the keyboard, and the application will guide you through the process of interacting with the database.

## Features

### 1. View All Departments

- Displays a table showing department names and their respective IDs.

### 2. View All Roles

- Shows the job title, role ID, department name, and salary for each role.

### 3. View All Employees

- Displays employee details, including employee ID, first and last names, job title, department, salary, and manager.

### 4. Add a Department

- Allows users to input a department name to add a new department to the database.

### 5. Add a Role

- Prompts users to input the role name, salary, and associated department to add a new role.

### 6. Add an Employee

- Prompts users to input the employee’s first and last names, role, and manager to add a new employee to the database.

### 7. Update Employee Role

- Prompts users to select an employee and update their role in the database.

## Technologies

- **Node.js**: JavaScript runtime for building the command-line application.
- **Inquirer (v8.2.4)**: A powerful library for building interactive command-line user interfaces.
- **PostgreSQL**: Relational database management system used to store employee data.
- **dotenv**: For loading environment variables from a `.env` file.

## Database Schema

The database is structured into three tables: **departments**, **roles**, and **employees**.

### Tables:

1. **Departments**

   - `id`: Primary key
   - `name`: Department name

2. **Roles**

   - `id`: Primary key
   - `title`: Job title
   - `salary`: Role salary
   - `department_id`: Foreign key to the department

3. **Employees**
   - `id`: Primary key
   - `first_name`: Employee first name
   - `last_name`: Employee last name
   - `role_id`: Foreign key to the role
   - `manager_id`: Foreign key to the employee's manager (self-referencing)

## Walkthrough Video

[Link to walkthrough video demonstrating the application functionality]()

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
