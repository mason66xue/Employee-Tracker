DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE: cms_db;

USE cms_db;

CREATE TABLE department (
  -- id set to ainteger, automatic increment, and primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- name set to varchar, max size 30, not null
  name VARCHAR(30) NOT NULL

);

CREATE TABLE roles (
  -- id set to integer, automatic increment, and primary key
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- title set to varchar, max size 30, and not null
  title VARCHAR(30) NOT NULL
  -- salary set to decimal and not null
  salary DECIMAL NOT NULL, 
  -- department id set to integer and not null
  department_id INT NOT NULL,
  -- foreign key department id referencing department table on id with on delete constraint
  CONSTRAINT fk_department FOREIGN KEY(department_id)
  REFERENCES department(id) ON DELETE SET NULL 

  -- optional - index on department id
);

CREATE TABLE employee (
  -- id set to integer with automatic increment and primary key constraints
  id INT SET NULL AUTO_INCREMENT PRIMARY KEY,
  -- first name set to var char, max size 30, and not null contraint
  first_name VARCHAR(30) NOT NULL,
  -- last name set to var char, max size 30, and not null
  last_name VARCHAR(30) NOT NULL,
  -- role id set to integer and not null
  role_id INT NOT NULL,
  -- manager id set to integer
  manager_id INT
  -- foreign key on role id referencing role table on id with on delete constraint
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL

  -- foreign key on manager id referencing employee table on id with on delete constraint
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
  -- optional - indexes on role id, manager id
);
