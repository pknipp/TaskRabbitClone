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
  if (req.user) return res.redirect('/home');
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/users/signup', csrfProtection, (req, res) => {
  if (req.user) return res.redirect("/home");
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/users/edit', csrfProtection, (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("/home");
  res.render("edit", { csrf: req.csrfToken(), user});
});
//

router.get('/users/delete', csrfProtection, (req, res) => {
  const user = req.user;
  if (!user) res.redirect("/login");
  res.render("delete", {id: user.id, csrf: req.csrfToken()});
//  res.redirect("/home");
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

router.get('/taskers/:id(\\d+)/delete', csrfProtection, async (req, res) => {
  res.render("deleteTasker", {csrf: req.csrfToken() });
})

router.get('/admin', csrfProtection, async (req, res) => {
  res.render("admin", {csrf: req.csrfToken()});
})

router.get('/', (req, res) => {
  res.redirect('/home');
})

router.get('/users/:id(\\d+)', async (req, res) => {
  const user = req.user;
  const id = Number(req.params.id);
  if (!user) res.redirect("/login");
  if (user.id === id) {
    res.render("account", {user});
  } else {
    res.render("unauthorized", {message: "You are not authorized to access this page."});
  }
})

router.get('/jobs/:id(\\d+)', (req, res) => {
  const user = req.user;
  const id = Number(req.params.id);
  if (!user) res.redirect("/login");
  if (user.id === id) {
    res.render("jobs", {user});
  } else {
    res.render("unauthorized", {message: "You are not authorized to access this page."});
  }
});

router.get('/construction', (req, res) => res.render("construction"));

module.exports = router;
