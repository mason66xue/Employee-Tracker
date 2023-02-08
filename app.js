const { prompt } = require("inquirer");
const connection = require("./db/connection");



// MAIN MENU
function mainMenu() {
  prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "main",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPS"
        },
        {
          name: "View Managers",
          value: "VIEW_MNGRS"
        },
        {
          name: "Add Employee",
          value: "ADD_EMP"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_MNGR"
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMP"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Delete Role",
          value: "DELETE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPT"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }      
      ]
    }
  ]).then((answer) => {
    switch (answer.main) {
      case "VIEW_EMPS":
        viewAllEmployees();
        break;
      case "VIEW_MNGRS":
        viewAllManagers();
        break;
      case "ADD_EMP":
        addNewEmployee();
        break;
      case "UPDATE_ROLE":
        updateEmpRole();
        break;
      case "UPDATE_MNGR":
        updateEmpMngr();
        break;
      case "DELETE_EMP":
        deleteEmp();
        break;
      case "VIEW_ROLES":
        viewAllRoles();
        break;
      case "ADD_ROLE":
        addNewRole();
        break;
      case "DELETE_ROLE":
        deleteEmpRole();
        break;
      case "VIEW_DEPTS":
        viewAllDepartments();
        break;
      case "ADD_DEPT":
        addNewDepartment();
        break;
      case "DELETE_DEPT":
          deleteEmpDept();
          break;
      default:
        quit();
    }
  })
};

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
  connection.viewEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainMenu());
};

// VIEW ALL MANAGERS
function viewAllManagers() {
  connection.viewManagers()
    .then(([rows]) => {
      let managers = rows;
      console.log("\n");
      console.table(managers);
    })
    .then(() => mainMenu());
};

// ADD EMPLOYEE
function addNewEmployee() {
  connection.viewEmpsToEdit()
  .then(([rows]) => {
    let employees = rows;
    const roleChoices = employees.map(({ role_id, title }) => ({
      value: role_id,
      name: title
    }));
    const managerChoices = employees.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    prompt([
      {
        type: "input",
        message: "Enter the new Employee's first name.",
        name: "newFirstName"
      },
      {
        type: "input",
        message: "Enter the new Employee's last name.",
        name: "newLastName"
      },
      {
        type: "list",
        message: "Choose the employee's role.",
        name: "newRole",
        choices: roleChoices
      },
      {
        type: "list",
        message: "Choose the new employee's manager.",
        name: "newManager",
        choices: managerChoices
      }
    ])
    .then(employee => {
      connection.addEmployee(employee)
      .then(() => console.log(`Added ${employee.newFirstName} to the database.`))
      .then(() => mainMenu())
    })
  })
};

// UPDATE EMPLOYEE ROLE
function updateEmpRole() {
  connection.viewEmpsToEdit()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    const roleChoices = employees.map(({ role_id, title }) => ({
      value: role_id,
      name: title
    }));
    prompt([
      {
        type: "list",
        message: "Choose the employee would you like to update.",
        name: "empToChange",
        choices: employeeChoices
      },
      {
        type: "list",
        message: "Choose the role you'd like to assign to the selected employee.",
        name: "empRole",
        choices: roleChoices
      }
    ])
    .then(role => {
      connection.updateRole(role)
      .then(() => console.log(`Updated manager of employee ${role.empToChange} in the database.`))
      .then(() => mainMenu())
    })
  })
};

// UPDATE EMPLOYEE MANAGER
function updateEmpMngr() {
  connection.viewEmpsToEdit()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    const managerChoices = employees.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    prompt([
      {
        type: "list",
        message: "Choose the employee would you like to update.",
        name: "empToChange",
        choices: employeeChoices
      },
      {
        type: "list",
        message: "Choose the manager you'd like to assign to the selected employee.",
        name: "empMngr",
        choices: managerChoices
      }
    ])
    .then(mngr => {
      connection.updateMngr(mngr)
      .then(() => console.log(`Updated manager of employee ${mngr.empToChange} in the database.`))
      .then(() => mainMenu())
    })
  })
};

// DELETE EMPLOYEE
function deleteEmp() {
  connection.viewEmpsToEdit()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    prompt([
      {
        type: "list",
        message: "Choose the employee you'd like to remove from the database.",
        name: "empToDelete",
        choices: employeeChoices
      }
    ])
    .then(employee => {
      connection.deleteEmployee(employee)
      .then(() => console.log(`Deleted employee ${employee.empToDelete} from the database.`))
      .then(() => mainMenu())
    })
  })
};

// VIEW ALL ROLES
function viewAllRoles() {
  connection.viewRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainMenu());
};

// ADD ROLE
function addNewRole() {
  connection.viewDeptName()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    prompt([
      {
        type: "input",
        message: "Enter the title of the new role.",
        name: "newTitle"
      },
      {
        type: "number",
        message: "Enter the salary of the new role.",
        name: "newSalary"
      },
      {
        type: "list",
        message: "Choose the department that the new role belongs to.",
        name: "newDept",
        choices: departmentChoices
      }
    ])
    .then(role => {
      connection.addRole(role)
      .then(() => console.log(`Added ${role.newTitle} to the database.`))
      .then(() => mainMenu())
    })
  })
};

// DELETE ROLE
function deleteEmpRole() {
  connection.viewRoleTitle()
  .then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      value: id,
      name: title
    }));
    prompt([
      {
        type: "list",
        message: "Choose the role you'd like to delete.",
        name: "roleToDelete",
        choices: roleChoices
      }
    ])
    .then(role => {
      connection.deleteRole(role)
      .then(() => console.log(`Deleted role ${role.roleToDelete} from the database.`))
      .then(() => mainMenu())
    })
  })
};

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
  connection.viewDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainMenu());
};

// ADD DEPARTMENT
function addNewDepartment() {
  prompt([
    {
      type: "input",
      message: "Enter the name of the new department.",
      name: "newDeptName"
    }
  ])
  .then(res => {
    let department = res;
    connection.addDepartment(department)
      .then(() => console.log(`Added ${department.newDeptName} to the database.`))
      .then(() => mainMenu())
  })
};

// DELETE DEPARTMENT
function deleteEmpDept() {
  connection.viewDeptName()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      value: id,
      name: name
    }));
    prompt([
      {
        type: "list",
        message: "Choose the department you'd like to delete.",
        name: "deptToDelete",
        choices: departmentChoices
      }
    ])
    .then(dept => {
      connection.deleteDept(dept)
      .then(() => console.log(`Deleted department ${dept.deptToDelete} from the database.`))
      .then(() => mainMenu())
    })
  })
};

// QUIT
function quit() {
  console.log("Goodbye!!");
  process.exit();
}

// INITIALIZE FUNCTION
init();
