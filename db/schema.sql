DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;

\c employee;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
