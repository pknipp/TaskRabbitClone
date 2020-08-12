const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { Tasker } = require("../../db/models");

router.get("/:id(\\d+)", routeHandler( async(req, res) => {
    const taskers = await Tasker.findAll({
        where: {jobTypeId: req.params.id}
    })

})
)


module.exports = router;
