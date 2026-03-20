const { Router } = require("express");
const indexRouter = Router();
const signupController = require('../controllers/signupController');
const passport = require("passport");

indexRouter.get("/", (req, res) => res.render('home'));
indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.post("/signup", signupController.createUser);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/login"
  })
);
indexRouter.get('/messages', (req, res) => res.render('messages'))


module.exports = indexRouter;