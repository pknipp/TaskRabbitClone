
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const { expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { User } = db;

const { check }= require('express-validator');

const validateAuthFields = [
  check("lastName", "Last name must be between 1 and 80 characters")
    .exists()
    .isLength({ min: 1, max: 80 }),
  check("email", 'Email must be a valid email between 5 and 80 characters.')
    .exists()
    .isLength({ min: 5, max: 80 })
    .isEmail(),
  check("phone", 'Phone number must be valid')
    .exists()
    .isLength(10),
  check("password", "Password field must be 6 or more characters")
    .exists()
    .isLength({ min: 6, max: 70 }),
  check('password2', 'Confirm password field must have the same value as the password field')
    .exists()
    .custom((value, { req }) => value === req.body.password)
]

router.post(
  "/signup",
  csrfProtection,
  validateAuthFields,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      hashedPassword: bcrypt.hashSync(password, 10),
    });

    const token = await getUserToken(user);
    res.cookie("token", token, { maxAge: expiresIn * 1000 });

    res.json({ id: user.id, token });
  })
);

router.post('/token', (req, res, next) => {

});

module.exports = router;
