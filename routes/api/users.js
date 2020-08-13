
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const { expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { User } = db;
const { check, validationResult } = require("express-validator");
const csrfProtection = require("csurf")({cookie: true})


const validateAuthFields = [
  check("lastName", "Last name must be between 1 and 80 characters")
    .exists()
    .isLength({ min: 1, max: 80 }),
  check("email", 'Email must be a valid email between 5 and 80 characters.')
    .exists()
    .isLength({ min: 5, max: 80 })
    .isEmail(),
  // check("phone", 'Phone number must be valid')
  //   .exists()
  //   .isLength(10),
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
    const { firstName, lastName, email, phone, password } = req.body;

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

// router.post('/token', (req, res, next) => {

// });
const loginAuthenticator = [
    check("email", "Must be a valid email address")
        .exists()
        .isEmail(),
    check("password")
        .exists()
        .withMessage("Password field can't be blank")
]

// Ed's route
// router.get('/:id', async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   res.json({user});
// })

router.post('/login', csrfProtection, loginAuthenticator,
    handleValidationErrors, routeHandler( async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        })
        if(!user || !user.validatePassword(password)) {
            const error = new Error("Incorrect Email or Password");
            error.status = 401;
            error.title = "unauthorized";
            throw error;
        }
        const userToken = await getUserToken(user);
        res.cookie("token", userToken, {maxAge: expiresIn * 1000});
        res.json({id: user.id, userToken});
}));

// PK created the next few lines
// router.get("/:id(\\d+)", loginAuthenticator, routeHandler(async(req, res) => {
//   const user = await User.findByPk(req.params.id);
// }))

module.exports = router;
