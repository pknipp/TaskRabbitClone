const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { Tasker, JobType } = require("../../db/models");


router.get('/', routeHandler( async(req, res) => {
  const jobTypes = await JobType.findAll();
  const jobTypesData = jobTypes.map(jobType => jobType.dataValues);
  res.json(jobTypesData);
}))

router.get("/:id(\\d+)/", routeHandler( async(req, res) => {
    const taskers = await Tasker.findAll({
        where: {jobTypeId: req.params.id},
        include: { model: JobType }
    })
    const taskersData = taskers.map(tasker => tasker.dataValues);
    res.json(taskersData);

}))

router.get("/:id(\\d+)/:sort(skill|pLow|pHigh|default)", routeHandler( async(req, res) => {
    const sort = req.params.sort;
    let options = [
        ['id'],
        ['price'],
        [['price', 'DESC']],
        [['skill', 'DESC']]
    ];
    let option = (sort === "default") ? options[0] :
                 (sort === "pLow") ? options[1] :
                 (sort === "pHigh") ? options[2] :
                                    options[3]

    const taskers = await Tasker.findAll({
        where: {jobTypeId: req.params.id},
        order: option,
        include: { model: JobType }

    })
    const taskersData = taskers.map(tasker => tasker.dataValues);
    res.json(taskersData);

}))


module.exports = router;
