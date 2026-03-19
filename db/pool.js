const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: `postgresql://${process.env.DB_LOGIN}:${process.env.DB_PWD}@localhost:5432/${process.env.DB_NAME}`
});