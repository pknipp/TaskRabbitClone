
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {secret, expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const {User, Job, Tasker , JobType} = db;
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
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.hashedPassword = bcrypt.hashSync(req.body.password, 10),
    await user.save();
    res.cookie("token", req.cookies.token, { maxAge: expiresIn * 1000 });
    // Is following step really needed?  (PK)
    res.json({ id: user.id, token });
  })
);


router.delete(
  "/deleteUser",
  csrfProtection,
// No need for middleware below, because there are no (visible) fields
//  validateAuthFields,
//  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const userId = req.body.userId;
    console.log("api router thinks that userId = ", userId);
    const user = await User.findByPk(userId);
    console.log("api router thinks that user = ", user);
    // user's jobs must be found & deleted before user may be deleted
    const jobs = await Job.findAll({where: {userId}});
    jobs.forEach(async job => await job.destroy());
    await user.destroy();
    res.json({});
  })
);

router.delete(
  "/deleteJob",
  csrfProtection,
// No need for middleware below, because there are no (visible) fields
//  validateAuthFields,
//  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const jobId = req.body.jobId;
    const job = await Job.findByPk(jobId);
    await job.destroy();
    res.json({});
  })
);

router.delete(
  "/deleteTasker",
  csrfProtection,
// No need for middleware below, because there are no (visible) fields
//  validateAuthFields,
//  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const taskerId = req.body.taskerId;
    const tasker = await Tasker.findByPk(taskerId);
    // tasker's jobs must be found & deleted before tasker may be deleted
    const jobs = await Job.findAll({where: {taskerId}});
    jobs.forEach(async job => await job.destroy());
    await tasker.destroy();
    res.json({});
  })
);

router.delete(
  "/deleteJobType",
  csrfProtection,
// No need for middleware below, because there are no (visible) fields
//  validateAuthFields,
//  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const jobTypeId = req.body.jobTypeId;
    const jobType = await JobType.findByPk(jobTypeId);
    console.log(jobType);
    // jobType's taskers must be found & deleted before jobType may be deleted
    // taskers' jobs must be found & deleted before tasker may be deleted
    const taskers = await Tasker.findAll({where: {jobTypeId}});
    for (const tasker of taskers) {
      const jobs = await Job.findAll({where: {taskerId: tasker.id}});
      jobs.forEach(async job => await job.destroy());
    }
    taskers.forEach(async tasker => await tasker.destroy());
    await jobType.destroy();
    res.json({});
  })
);

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
