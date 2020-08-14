const express = require('express');
const app = express();

const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');



app.set("view engine", "pug");

app.use(require("morgan")('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());

const { getUserFromToken } = require("./routes/utils/auth");

app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next();

  const user = await getUserFromToken(token, res);
  if (user) req.user = user;
  else res.clearCookie('token');
  next();
});

app.use("/public", express.static('public'));

app.use('/api', apiRouter);
app.use('/', pagesRouter);

app.use((req, res, next) => res.render('error-page'));


// app.get("/", (req, res) => res.render("layout", {}))
// what follows is an example of of route-specific middleware
//app.get('/tasks', csrfProtection, (req, res) => {...});
//app.get('/hello', (req, res) => res.send('Hello World!'));

module.exports = app;
