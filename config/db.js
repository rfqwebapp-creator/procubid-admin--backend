// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: 3306,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// module.exports = db;






const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySql@123",
  database: "procubid_admin",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;