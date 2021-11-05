const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Cindaboo08!',
      database: 'barter'
    },
    console.log('Are you ready to barter??')
  );

  module.exports = db;