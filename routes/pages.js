const router = require("express").Router();
const csrfProtection = require("csurf")({ cookie: true });

router.get('/users/login', csrfProtection, (req, res) => {
  if (req.user) return res.redirect('/home');
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/users/signup', csrfProtection, (req, res) => {
  if (req.user) return res.redirect("/home");
  // From Nick: ^ What is this doing? ^
  res.render("signup", { csrf: req.csrfToken() });
});

router.get('/jobTypes/:id(\\d+)', (req, res) => {
  res.render("taskers", {jobTypeId: req.params.id});
})


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
