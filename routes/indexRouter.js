const { Router } = require("express");
const indexRouter = Router();
const signupController = require('../controllers/signupController');
const passport = require("passport");

//MAIN PAGES
indexRouter.get("/", (req, res) => res.render('home', { error: req.query.error }));
indexRouter.get('/messages', (req, res) => res.render('messages'));

//SIGNUP/LOGIN ROUTING
indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.post("/signup", signupController.createUser);
indexRouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/messages",
        failureRedirect: "/?error=true"
    })
);

//LOGOUT
indexRouter.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

//PROFILE / MAKE ADMIN
indexRouter.get("/profile", (req, res) => {
    if (!req.user) return res.redirect("/");
    res.render("profile", { error: undefined });
});

indexRouter.post("/makeAdmin", signupController.makeAdmin);
indexRouter.post('/removeAdmin', signupController.removeAdmin);

//MESSAGES
indexRouter.get('/createMessage', (req, res) => res.render('createMessage'));


module.exports = indexRouter;