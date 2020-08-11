
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const { check, validationResult } = require("express-validator");
const csrfProtection = require("csurf")({cookie: true})
const db = require("../../db/models");
const { User } = db;

router.post('/', (req, res, next) => {

});

const loginAuthenticator = [
    check("email")
        .exists()
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("password")
        .exists()
        .withMessage("This field can't be blank")
]

router.post('/login', csrfProtection, loginAuthenticator,
    handleValidationErrors, routeHandler( async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        })
        if(!user || !user.validatePassword(password)) {
            const error = new Error("Incorrect Email or Password");
            error.status = 401;
            error.title = unauthorized;
            next(error);
        }
        const userToken = await getUserToken(user)
        
}));

module.exports = router;
