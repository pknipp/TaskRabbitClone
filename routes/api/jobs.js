const express = require("express");
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { User, Job, Tasker, JobType } = require("../../db/models");

 router.get("/:id(\\d+)/", routeHandler( async(req, res) => {
     const jobs = await Job.findAll({where: {userId: req.params.id}, include: [User, Tasker]});
     const jobsData = jobs.map(job => job.dataValues);
     res.json(jobsData);
 }))

 //PK copies the following from jobTypes.js

router.get("/:id1(\\d+)/:sort(\\d+)", routeHandler( async(req, res) => {
     const sort = req.params.sort;
     let options = [["name"],["taskerName"],["TaskerPrice"]];
//         [['id'],['price'],[['price', 'DESC']],[['skill', 'DESC']]
//     let option = (sort === "default") ? options[0] :
//                  (sort === "pLow") ? options[1] :
//                  (sort === "pHigh") ? options[2] :
//                                     options[3]

// let result = (x < 0) ? "negative" : "positive"
// let result = (x === 0) ? "zero" : (x < 0) ? "negative" : "positive"

//     const taskers = await Tasker.findAll({where: {jobTypeId: req.params.id}, order: option, include: { model: JobType });
     const jobs = await Job.findAll({where: {userId: req.params.id}, order: option, include: [User, Tasker]});
     // try doing this as Tasker.findAll ..where: {?:?} . include [User, Job]
     // 2nd idea: two queries:
     const jobsData = jobs.map(job => job.dataValues);
     res.json(jobsData);
}))

module.exports = router;
