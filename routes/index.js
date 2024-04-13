var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  res.sendFile("index.html", { root: "./public" });

});

//get the login page
router.get('/login', function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  res.sendFile("login.html", { root: "./public" });
});

//post the login page
router.post('/login', function (req, res, next) {
  const { username1, password1 } = req.body;
  console.log(username1, password1);
  if (username1 == 'admin' && password1 == 'admin') {
    console.log('logged in');
    req.session.user = username1;

    return res.redirect('/admin');
  } else {
    return res.redirect('/login');
  }
});


//get the admin page 
router.get('/admin', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile("admin.html", { root: "./public" });
});

//get session
router.get('/session', function (req, res, next) {
  res.json(req.session);
});

//test session
router.get('/test', function (req, res, next) {
  req.session.test = 'test';
  res.json(req.session);
});

//destroy session
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
