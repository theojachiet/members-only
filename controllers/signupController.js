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
    try {
        await db.makeAdmin(req.user.id);
        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function removeAdmin(req, res, next) {
    if (!req.user) return res.redirect('/');
    try {
        await db.removeAdmin(req.user.id);
        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function createMessage(req, res, next) {
    try {
        await db.createMessage(req.user.id, req.body.text, new Date());
        res.redirect('/messages');
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    createUser,
    makeAdmin,
    removeAdmin,
    createMessage,
}