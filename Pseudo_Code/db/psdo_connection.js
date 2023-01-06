const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "<your_password>",
  database: "<your_database>"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
