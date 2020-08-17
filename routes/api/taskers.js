
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const db = require('../../db/models');
const {Job, Tasker} = db;
const { check, validationResult } = require("express-validator");
const csrfProtection = require("csurf")({cookie: true})

// const validateAuthFields = [
//   check("lastName", "Last name must be between 1 and 80 characters")
//     .exists()
//     .isLength({ min: 1, max: 80 }),
//   check("email", 'Email must be a valid email between 5 and 80 characters.')
//     .exists()
//     .isLength({ min: 5, max: 80 })
//     .isEmail(),
//   // check("phone", 'Phone number must be valid')
//   //   .exists()
//   //   .isLength(10),
//   check("password", "Password field must be 6 or more characters")
//     .exists()
//     .isLength({ min: 6, max: 70 }),
//   check('password2', 'Confirm password field must have the same value as the password field')
//     .exists()
//     .custom((value, { req }) => value === req.body.password)
// ]

router.delete(
  "/delete",
  csrfProtection,
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

module.exports = router;
