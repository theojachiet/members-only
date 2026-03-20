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

async function makeAdmin(req, res, next) {
    if (!req.user) return res.redirect("/");
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
        return res.render("profile", { error: "Incorrect admin password" });
    }
    db.makeAdmin(req.user.id)
        .then(() => res.redirect("/profile"))
        .catch(next);
}

module.exports = {
    createUser,
    makeAdmin
}