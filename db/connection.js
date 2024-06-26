const mysql = require('mysql2');

require('dotenv').config(); // for loading MySQL credentials from .env file

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

module.exports = connection.promise();
