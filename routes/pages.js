const express = require("express");
const router = express.Router();

router.get('/users/login', (req, res) => {
  res.render("login");
})

router.get('/users/:id')

module.exports = router;
