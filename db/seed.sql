INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ruochen", "Liu", 1, null),
       ("Min", "Zhang", 2, 1),
       ("Simon", "Xu", 3, null),
       ("Avery", "Patterson", 4, 3),
       ("Renee", "Dunn", 5, null),
       ("Sophia", "Jin", 6, 5),
       ("Tom", "Brady", 7, null),
       ("Eric", "Allen", 8, 7);