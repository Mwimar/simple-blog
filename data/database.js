const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "webdon",
  password: "President@1998",
});

// module.exports = pool;

// const mysql = require("mysql2/promise");
// const pool = mysql.createConnection({
//   host: "localhost",
//   database: "blog",
//   user: "webdon",
//   password: "President@1998",
// });

// pool.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = pool;
