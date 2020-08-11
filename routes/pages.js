const express = require("express");
const router = express.Router();

const csrfProtection = require("csurf")({ cookie: true });


router.get('/signup', csrfProtection, (req, res) => {
  if (req.user) {
    // res.redirect("/home");
    return;
  }
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/users/:id')

module.exports = router;
