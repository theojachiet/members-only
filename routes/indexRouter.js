const { Router } = require("express");
const indexRouter = Router();
const signupController = require('../controllers/signupController');
const passport = require("passport");

indexRouter.get("/", (req, res) => res.render('home', { error: req.query.error }));
indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.post("/signup", signupController.createUser);
indexRouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/messages",
        failureRedirect: "/?error=true"
    })
);
indexRouter.get('/messages', (req, res) => res.render('messages'))


module.exports = indexRouter;