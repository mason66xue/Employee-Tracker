
/*
  REMOVE COMMENTS BEFORE SUBMITTING YOUR HOMEWORK
*/

// Import inquirer
const inquirer = require ('inquirer');

// Optional: import asciiart-logo
// import your database module
const db = require("./db");

// Import console table for logging information on screen in table format
require("console.table");

// Call startup function

// function: start up
//    optional: display logo text using asciiart-logo
//    call function to the main prompt for questions
mainMenu();

// function - main prompt for questions
// - Prompt with the list of choices
function mainMenu (){
  inquirer
  .promt(
    {
    type: 'list',
    message:'What would you like to do?',
    name: 'main',
    choices:[
      {
      name: 'View All Employees',
      value: 'view_employees'
      },
      {
        name: 'view managers',
        value: 'view Managers'
      },
      {
        name: 'add employee',
        value: 'add_employee'
      },
      {
        name: 'update employee manager',
        value: 'update manager'
      },
      {
        name: 'view all roles',
        value: 'view_roles'
      },
      {
        name: 'add role',
        value: 'add_role'
      },
      {
        name: 'delete role',
        value: 'delete_role'
      },
      {
        name: 'view all departement',
        value: 'view_department',
      },
      {
        name:'add department',
        value:'add_department'
      },
      {
        name: 'delete department',
        value: 'delete_department'
      },
      {
        name: 'quit',
        value:'quit'
      }

      
    ]
  })
}

// - In .then callback, check user's response with the switch-case statement.
//    call the appropriate function depending on what the user chose
//      - in case of view employees, call the view employees function
//      - in case of add employee, call the add employee function
//      - in case of update employee's role, call the update employee role function
//      - in case of view departments, call the view departments function
//      - in case of add department, call the add department function
//      - in case of view roles, call the view roles function
//      - in case of add role, call the add role function
//      - in default, call function to quit
//
// OPTIONAL:
//      - in case of update employee's manager, call the update employee manager function
//      - in case of view employees by manager, call the view employees by manager function
//      - in case of view employees by department, call the view employees by department function
//      - in case of view utilized budget by department, call the function to view utilized budget by department
//      - in case of remove department, call the remove department function
//      - in case of remove role, call the remove role function
//      - in case of remve employee, call the remove employee function
//      - in default, call function to quit

// function - View all employees
  // 1. call find all employees method on database connection
  //    in .then callback, display returned data with console table method
  // 2. call function to load main prompt for questions
  function viewALLEmployee (){
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN departmen ON role.department_id = department.id ORDER BY employee.id;'),
    function(err, res) {
      if (err) throw err
      console.table(res)
      mainMenu()
    }
 }
  

// function - View all roles
// 1. call find all roles method on database connection
//    in .then callback, dispalay returned data with console table
// 2. call function to load main prompt for questons
//
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  mainMenu()
  })
}

// function - View all deparments
//  1. call find all departments method on database connnection
//      in .then call back, display returned data with console table
//  2. call function to load main prompt for questions
//
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    mainMenu()
  })
}
// Add a department
//  1. prompt user for the name of the department
//      in .then callback, call create department method on database connection, passing the returned data as input argument
//  2. call function to load main prompt for questions
function addDepartment (){
  inquirer.promt(
    [
      {
        name: 'name',
        type:'input',
        message:'What department would you like to add?'
      }
    ]
  ). then(function(res){
    const query =connection.query(
      "INSERT INTO DEPARTMENT SET",
      {
        name: res.name
      },
      function (err){
        if (err) throw err
        console.table(res);
        mainMenu();
      }
    )
  })
}

// functon - Add a role
//  **prompt for user to enter the role, the salary, and what department the role belongs to
//  1. call find all departments method on database connection to get array of existing department records
//      in .then call back, create array of objects with names and ids from returned data with .map() method
//  2. prompt user for title, salary, and department choosing from the list of departmernts created above
//      in .then callback, call funcon to create role on database connection, passing returned data from prompt as input argument
//  3. call function to load main prompt for questions

function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the tile of the role?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                mainMenu();
            }
        )

    });
  });
  }

// function - Add a new employee
//  1. prompt for first_name and last_name
//      in .then callback, store the first namd and the last name to variables,
//  2. call function to find all roles on database connection to get all existing roles
//      in .then callback, create array of role objects with id and title from returned array of role data with .map()
//  3. prompt user for the role for the employee choosing from a list (array) of role objecs
//      in .then callback, store the role id to a variable,
//  4. call function to find all employees on database connection
//      in .then callback, create array of managers with id, first name, last name from the returned data with .map()
//  5. prompt user for the manager from a list from the array of managers
//      in .then callback, create an employee object with variables for first name, last name, role id, manager id
//  6. call function to create employee on database connection, passing the employee object as input argument
//      in .then callback, call function to load main prompt for questions

function addEmployee() { 
  inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name "
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name "
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole()
      },
      {
          name: "choice",
          type: "rawlist",
          message: "Whats their managers name?",
          choices: selectManager()
      }
  ]).then(function (val) {
    var roleId = selectRole().indexOf(val.role) + 1
    var managerId = selectManager().indexOf(val.choice) + 1
    connection.query("INSERT INTO employee SET ?", 
    {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId
        
    }, function(err){
        if (err) throw err
        console.table(val)
        mainMenu()
    })

})
}


// function - Update an employee's role
//  1. call function to find all employees on database connection
//      - in .then callback, take first name, last name, and id from the returned database data and create an array
//        of new employee objects with .map().
//      - new objects have two properties, name and value
//        name consists of first name and last name from the returned database data
//        value has id from the returned database data
//  2. prompt the list of choices from the new array of employee objects
//      - in .then callback, store employee id to a variable from the returned user choice
//  3. call function to find all roles on database connection
//      - in .then callback, create a new array of new role objects using .map on the returned database role data
//      - for the new role objects, assign title from returned database data to the name property and assign id to the value property
//  4. prompt user with the list of choices from the new array of new role objects
//      - in .then callback, assign returned user choice to a role id variable
//  5. call function to update employee role, passing employee id variable and role id variable as input arguments
//  6. call fucntion to load main prompt of questions
connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
   if (err) throw err
   console.log(res)
  inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the Employee's last name? ",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRole()
        },
    ]).then(function(val) {
      var roleId = selectRole().indexOf(val.role) + 1
      connection.query("UPDATE employee SET WHERE ?", 
      {
        last_name: val.lastName
         
      }, 
      {
        role_id: roleId
         
      }, 
      function(err){
          if (err) throw err
          console.table(val)
          mainMenu()
      })

  });
});

// function - Exit the application

function exit (){
  console.log('succeful exit!');
};

exit();