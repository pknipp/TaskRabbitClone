const express = require("express");
const router = express.Router();

const csrfProtection = require("csurf")({ cookie: true });

router.get('/home', csrfProtection, (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("home", { username: req.user.username, csrf: req.csrfToken() });
});

router.get('/signup', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect("/home");
    return;
  }
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/users/:id')

module.exports = router;
