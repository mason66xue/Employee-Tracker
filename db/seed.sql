-- USE your_database;
USE cms_db;


-- INSERT INTO your_table_for_departments
INSERT INTO department (names)
VALUE 
("Sales"),
("Legal"),
("Engineering"),
("Finance");

-- INSERT INTO your_table_for_roles
INSERT INTO roles (title, salary, department_id)
VALUE
('Sales Associate', 70000,1),
('Legal Counsel',100000,2),
('Software Engineer',120000,3),
('Financial Analyst', 60000,4);

-- INSERT INTO your_table_for_employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE
('Ruochen','Liu',3,null),
('Ian','Patterson',2,1),
('Sophia','Kim',4 null),
('Taylor','Swift',1, 3),
('Neha','Patel', 4, null),
('Mike','Netta',2),
('Alice','Dunn',3,7);