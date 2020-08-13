const router = require("express").Router();
const csrfProtection = require("csurf")({ cookie: true });
const db = require('../db/models');
const { routeHandler } = require("./utils");
const { User, Job, Tasker, JobType } = db;

router.get("/login", (req, res) => {
  res.redirect("/users/login")
})

router.get("/users/register", (req, res) => {
  res.render("register")
})

router.get('/users/login', csrfProtection, (req, res) => {
  if (req.user) return res.redirect('/home');
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/users/signup', csrfProtection, (req, res) => {
  if (req.user) return res.redirect("/home");
  // From Nick: ^ What is this doing? ^
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/home', async (req, res) => {
  const jobTypes = await JobType.findAll();
  res.render("home", { jobTypes });
});

router.get('/jobtypes/:id(\\d+)', (req, res) => {
  res.render("taskers", { jobTypeId: req.params.id })
});

router.get('/users/:id(\\d+)', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const jobsPath = `/users/${user.id}/jobs`;
  res.render("account", {user, jobsPath});
});

router.get('/users/:id(\\d+)/jobs', async (req, res) => {
  const jobs = await Job.findAll({where: {userId: req.params.id}, include: [Tasker, User]});
  res.render("jobs", {jobs});
});

// router.get('/home', csrfProtection, (req, res) => {
//   if (!req.user) return res.redirect("/login");
//   res.render("home", { username: req.user.username, csrf: req.csrfToken() });
// });

// router.get('/tweets/:id', (req, res) => {
//   if (!req.user) return res.redirect("/login");
//   res.render("tweet-show", { username: req.user.username })
// });

// router.get('*', (req, res) => res.render('error-page')});

//router.get('/users/:id')

module.exports = router;
