const express = require('express');
const router = express.Router();

const localAuth = require('../lib/localAuthentication');
const authHelpers = require('../lib/authChecks');
const errorResponseHandler = require('../lib/errorHandlers').errorResponseHandler;

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  authHelpers.getUser(username)
  .then((userRecord) => {
    if (authHelpers.isCorrect(password, userRecord.password)) {
      console.log('correct login');
      // Generate and save token:
      var token = localAuth.encodeToken(username);
      res.cookie('authToken', token);
      // Redirect to the beer list:
      res.redirect('/beer');
    } else {
      errorResponseHandler(res, 500, 'Please login with correct credential!');
    }
  })
  .catch((err) => {
    errorResponseHandler(res, 500, 'Please login first');
  });
});

router.post('/logout', (req, res, next) => {
  res.clearCookie("authToken");
  res.redirect('/');
});

module.exports = router;
