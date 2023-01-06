/************************************************
  REMOVE ALL COMMENTS BEFORE SUBMITTING YOUR HOMEWORK
*************************************************/

// As suggested in README.md guideline for this homework, you can choose to use constructor functions or class to develop the functions
//  for SQL statements. Since class gives you cleaner syntax, this pseudo code is assumed that you use class for the implementation of
//  SQL statements. Remember both constructor functions and classes are used to create objects.

// HINT: To use promise wrapper, for example:
//  const databaseConnection = mysql.createConnection({...});
//  databaseConnection.promise().query(...);
//
//  - the whole query statement needs to be returned in the same line for the caller to receive the data with promise .then or async/await
//        for example: return databaseConnection.promise().query(...);
//  - all queries that take in parameters need to be prepared statements

// STEPS
// 1. import database connection from the current db folder
// 2. Declare a database class for methods to encapsulate all SQL statements
//    a. constructor takes in database connection as input parameter
//    b. set the instance variable to the connection object passed in
// 3. Exports the database object instantiated from the database class, passing connection object to the class constructor

// =============
// MAIN PROCESS
// =============

// class - for database or database access object
//  1. constructor - takes in database connection as input parameter and assign it to the instant variable
//  2. method - find all employees, join with roles and departments to display their roles, salaries, departments, and managers
//  3. method - create a new employee - takes employee object as input parameter
//  4. method - update employee's role - takes employee id and role id as input parameters
//  5. method - find all roles - join with departments to diplay department names
//  6. method - create a new role - takes in role object as input parameter
//  7. method - find all departments
//  8. method - create a new department - takes in department object as input parameter

// ================
// OPTIONAL METHODS
// ================

//  - method: Find all employees except the given employee id
//  - method: Find all employees in a given department, join with roles to display role titles
//  - method: Find all employees by manager, join with departments and roles to display titles and department names
//  - method: Find all departments, join with employees and roles and sum up utilized department budget
//  - method: Remove a department
//  - method: Remove a role from the db
//  - method: Update the given employee's manager
//  - method: Remove an employee with the given id


