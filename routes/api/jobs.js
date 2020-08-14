const express = require("express");
const router = express.Router();
const csrfProtection = require("csurf")({ cookie: true });
const { routeHandler, handleValidationErrors } = require('../utils');
const { User, Job, Tasker, JobType } = require("../../db/models");

 router.get("/:id(\\d+)/", routeHandler( async(req, res) => {
     const jobs = await Job.findAll({where: {userId: req.params.id}, include: [User, Tasker]});
     res.json(jobs.map(job => job.dataValues));
 }))

router.get("/:id(\\d+)/:sort(\\d+)", routeHandler( async(req, res) => {
     let options = [["userId"],["jobDate"],[[Tasker, "name"]],[[Tasker,"price"]]];
     const jobs = await Job.findAll({where: {userId: req.params.id}, include: [User, Tasker], order: options[req.params.sort]});
     res.json(jobs.map(job => job.dataValues));
}))

router.post("/", csrfProtection, routeHandler(async(req, res) => {
    const {userId, taskerId, jobDate, details} = req.body;
    let job = await Job.create({userId, taskerId, jobDate, details});
    if(job) {
        res.status(200).end()
    }
}))

module.exports = router;
