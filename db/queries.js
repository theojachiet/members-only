const pool = require('./pool');

async function addUser(name, password) {
    await pool.query("INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3)", [
        name,
        password,
        false,
    ]);
}

async function makeAdmin(id) {
    await pool.query("UPDATE users SET is_admin = TRUE WHERE id = $1", [id]);
}

async function removeAdmin(id) {
    await pool.query('UPDATE users SET is_admin = FALSE WHERE id = $1', [id]);
}

async function createMessage(user_id, text, date) {
    await pool.query('INSERT INTO messages (user_id, text, date) VALUES ($1, $2, $3)', [
        user_id,
        text,
        date
    ])
}

module.exports = {
    addUser,
    makeAdmin,
    removeAdmin,
    createMessage
};