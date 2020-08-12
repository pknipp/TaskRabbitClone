const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { Tasker, JobType } = require("../../db/models");

router.get("/:id(\\d+)/", routeHandler( async(req, res) => {
    const taskers = await Tasker.findAll({
        where: {jobTypeId: req.params.id},
        include: { model: JobType }
    })
    const taskersData = taskers.map(tasker => tasker.dataValues);
    res.json(taskersData);

}))

router.get("/:id(\\d+)/:sort", routeHandler( async(req, res) => {
    const sort = req.params.sort;
    console.log(sort);
    const taskers = await Tasker.findAll({
        where: {jobTypeId: req.params.id},
        include: { model: JobType }
    })
    const taskersData = taskers.map(tasker => tasker.dataValues);
    res.json(taskersData);

}))


module.exports = router;
