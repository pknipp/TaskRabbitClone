
const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const { check, validationResult } = require("express-validator");
const csrfProtection = require("csurf")({cookie: true})
const db = require("../../db/models");
const { User } = db;
const { expiresIn } = require("../../config").jwtConfig;

router.post('/', (req, res, next) => {

});

const loginAuthenticator = [
    check("email", "Must be a valid email address")
        .exists()
        .isEmail(),
    check("password")
        .exists()
        .withMessage("Password field can't be blank")
]

// add csrfprotection
router.post('/login', loginAuthenticator,
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

module.exports = router;
