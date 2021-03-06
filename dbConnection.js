require('dotenv').config();

var mySQL = require('mysql');
var connection = mySQL.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB,
});

module.exports = connection;
