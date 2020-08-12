const express = require('express');
const router = express.Router();

const { routeHandler } = require("../utils");

const db = require('../../db/models');
const { JobType, User } = db;

router.get('/', routeHandler(async (req, res) => {
  const jobtypes = await JobType.findAll();

  res.json({ jobtypes });
}));

router.get('', routeHandler(async (req, res) => {
  const jobtypes = await JobType.findOne({
    where: {
      id
    },
    include: {
      Tasker
    }
  });

  res.json({ jobtype });
}));
