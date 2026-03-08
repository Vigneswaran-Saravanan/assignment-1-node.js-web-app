import express from "express";
const router = express.Router();

import userController from "./controller.js";

// /user
router.get("/user", userController.getUser)

// /user/login
router.get("/login", userController.loginForm);

//login form submit
router.post("/login", userController.login);

// /user/register
router.get("/register", userController.registerForm);

//register form submit
router.post("/register", userController.register);

// /user/logout
router.get("/logout", userController.logout)

// GET /user - user page
router.get("/", (req, res) => {
  if (!req.session.loggedIn) return res.redirect("/login");

  res.render("user/user", {
    user: req.session.user
  });
});

export default router;