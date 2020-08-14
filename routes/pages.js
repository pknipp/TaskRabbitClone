const router = require("express").Router();
const csrfProtection = require("csurf")({ cookie: true });
const db = require('../db/models');
const { routeHandler } = require("./utils");
const { User, Job, Tasker, JobType } = db;

router.get("/login", (req, res) => {
  res.redirect("/users/login")
})

router.get("/users/logout", (req, res) => {
  res.redirect("/home")
})

router.get("/users/register", (req, res) => {
  res.render("register")
})

router.get('/users/login', csrfProtection, (req, res) => {
  console.log(req.id);
  if (req.user) return res.redirect('/home');
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/users/signup', csrfProtection, (req, res) => {
  if (req.user) return res.redirect("/home");
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/home', csrfProtection, async (req, res) => {
  const jobTypes = await JobType.findAll();
  if (req.user) {
    res.render("home", { userId: req.user.id, email: req.user.email, name: req.user.firstName, csrf: req.csrfToken(), jobTypes });
  } else {
    res.render("home", { jobTypes })
  };
});

router.get('/jobtypes/:id(\\d+)', csrfProtection, (req, res) => {
  if (req.user) {
    res.render("taskers", { userId: req.user.id, email: req.user.email, name: req.user.firstName, jobTypeId: req.params.id, csrf: req.csrfToken()});
  } else {
    res.render("taskers", { jobTypeId: req.params.id })
  }
})

router.get('/', (req, res) => {
  res.redirect('/home');
})

router.get('/users/:id(\\d+)', async (req, res) => {
  const user = await User.findByPk(req.params.id);
//  console.log("Is there a user on the request?", !!req.user);
  if (req.user) res.render("account", {user, jobsPath: `/jobs/${user.id}`});
  res.redirect("/login");
});

router.get('/jobs/:id(\\d+)', (req, res) => {
//  if (req.user && req.user.id === req.params.id)
  console.log("pages route thinks that userId = req.params.id = ", req.params.id);
  res.render("jobs", {userId: req.params.id});
//  res.redirect("/login");
});


// first version of PK's router
// router.get('/users/:id(\\d+)/jobs', async (req, res) => {
//   const jobs = await Job.findAll({where: {userId: req.params.id}, include: [User, Tasker]});
//   const accountPath = `/users/${jobs[0].userId}`
//   res.render("jobs", {jobs, accountPath});
// });

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
