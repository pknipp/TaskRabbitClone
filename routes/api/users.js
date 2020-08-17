
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {secret, expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const {Job, User } = db;
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

router.put(
  "/edit",
  csrfProtection,
  validateAuthFields,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const token = req.cookies.token;
    const user = await User.findByPk(jwt.verify(token, secret).id);
    if(user.firstName === "Demo" || user.lastName === "User" || user.id === "2" || user.email === "demo@user.io") {
      res.status(404).json({errors: ["You can not edit the details of the demo user!"]})
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.hashedPassword = bcrypt.hashSync(req.body.password, 10);

      await user.save();
      res.cookie("token", req.cookies.token, { maxAge: expiresIn * 1000 });
      // Is following step really needed?  (PK)
      res.json({ id: user.id, token });
    }

  })
);

router.delete(
  "/delete",
  csrfProtection,
// No need for middleware below, because there are no (visible) fields
//  validateAuthFields,
//  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const token = req.cookies.token;
    const id = jwt.verify(token, secret).id;
    const user = await User.findByPk(id);
    if(user.firstName === "Demo" || user.lastName === "User" || user.id === "2" || user.email === "demo@user.io") {
      res.status(404).json({errors: ["You can not deactivate the demo user!"]});
      return;
    } else {
       // user's jobs must be found & deleted before user may be deleted
    const jobs = await Job.findAll({where: {userId: id}});
    jobs.forEach(async job => await job.destroy());
    await user.destroy();
    res.cookie("token", req.cookies.token, { maxAge: expiresIn * 1000 });
    // Is following step really needed?  (PK)
    res.json({ id: user.id, token });
    }

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

router.post("/token", csrfProtection, loginAuthenticator,
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

router.delete('/session', routeHandler(async(req,res) => {
  res.clearCookie('token');
  res.json({ message: 'success' });
}));

router.get('/token', routeHandler(async (req, res, next) => {
  if (req.user) {
    return res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
  const err = new Error('Invalid token');
  err.status = 401;
  next(err);
}));

module.exports = router;
