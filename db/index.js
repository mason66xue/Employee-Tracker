// DEPENDENCIES
const connection = require('./connection.js');

// CLASS CONSTRUCTOR
class companyDatabase {
  constructor(connection) {
    this.connection = connection;
  };

  // VIEW ALL EMPLOYEES
  viewEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id AS "ID",
      CONCAT (employee.first_name," ", employee.last_name) AS "Employee",
      role.title AS "Title",
      department.name AS "Department",
      role.salary AS "Salary",
      CONCAT (manager.first_name," ", manager.last_name) AS "Manager"
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee manager
      ON manager.id = employee.manager_id;`
    );
  };

  // VIEW ALL MANAGERS
  viewManagers() {
    return this.connection.promise().query(
      `SELECT employee.id AS "ID",
      CONCAT (employee.first_name," ", employee.last_name) AS "Managers",
      role.title AS "Title",
      department.name AS "Department",
      role.salary AS "Salary"
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      WHERE employee.manager_id IS NULL;`
    );
  };
  
  // ADD EMPLOYEE
  addEmployee(employee) {
    return this.connection.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [employee.newFirstName, employee.newLastName, employee.newRole, employee.newManager]
    );
  };

  // UPDATE EMPLOYEE ROLE
  updateRole(role) {
    return this.connection.promise().query(
      `UPDATE employee
      SET role_id = ?
      WHERE id = ?`, [role.empRole, role.empToChange]
    );
  };

  // UPDATE EMPLOYEE MANAGER
  updateMngr(mngr) {
    return this.connection.promise().query(
      `UPDATE employee
      SET manager_id = ?
      WHERE id = ?`, [mngr.empMngr, mngr.empToChange]
    );
  };

  // DELETE EMPLOYEE
  deleteEmployee(employee) {
    return this.connection.promise().query(
      `DELETE FROM employee
      WHERE id = ?`, employee.empToDelete
    );
  };
    
  // VIEW ALL ROLES
  viewRoles() {
    return this.connection.promise().query(
      `SELECT role.id AS "ID",
      role.title AS "Title",
      department.name AS "Department",
      role.salary AS "Salary"
      FROM role
      JOIN department ON department.id = role.department_id;`
    );
  };
    
  // ADD ROLE
  addRole(role) {
    return this.connection.promise().query(
      `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?);`, [role.newTitle, role.newSalary, role.newDept]
    );
  };

  // DELETE ROLE
  deleteRole(role) {
    return this.connection.promise().query(
      `DELETE FROM role
      WHERE id = ?`, role.roleToDelete
    );
  };

  // VIEW ALL DEPARTMENTS
  viewDepartments() {
    return this.connection.promise().query(
      `SELECT department.id AS "ID",
      department.name AS "Department"
      FROM department;`
    );
  };

  // ADD DEPARTMENT
  addDepartment(department) {
    return this.connection.promise().query(
      `INSERT INTO department (name)
      VALUES (?);`, department.newDeptName
    );
  };
      
  // DELETE DEPARTMENT
  deleteDept(dept) {
    return this.connection.promise().query(
      `DELETE FROM department
      WHERE id = ?`, dept.deptToDelete
    );
  };
          
  // VIEW EMPLOYEES TO EDIT
  viewEmpsToEdit() {
    return this.connection.promise().query(
      `SELECT employee.id,
      CONCAT (employee.first_name," ", employee.last_name) AS "name",
      role.id AS "role_id",
      role.title
      FROM employee
      RIGHT JOIN role
      ON role.id = employee.role_id;`
    );
  };

  // VIEW ROLES TO EDIT
  viewRoleTitle() {
    return this.connection.promise().query(
      `SELECT role.id, role.title
      FROM role;`
    );
  };

  // VIEW DEPARTMENTS TO EDIT
  viewDeptName() {
    return this.connection.promise().query(
      `SELECT *
      FROM department;`
    );
  };

};
        
module.exports = new companyDatabase(connection);