const pool = require('./pool');

async function addUser(name, password) {
  await pool.query("INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3)", [
    name,
    password,
    false,
  ]);
}

module.exports = {
    addUser,
};