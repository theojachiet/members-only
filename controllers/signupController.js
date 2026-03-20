const db = require('../db/queries');
console.log(db);
const bcrypt = require('bcryptjs');

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addUser(req.body.username, hashedPassword);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    createUser,
}