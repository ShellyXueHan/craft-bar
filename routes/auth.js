const express = require('express');

const router = express.Router();
// Get the helper functions:
const localAuth = require('../lib/localAuthentication');
const authHelpers = require('../lib/authChecks');
const errorHelper = require('../lib/errorHandlers');

// Routes here are with /auth path:

/**
 * This route renders th elogin page:
 */
router.get('/', (req, res) => {
  res.render('login');
});

/**
 * This route start a login request:
 *  - get username and password input from user
 *  - check if credential is valid
 *  - if so, go to beer list
 */
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  authHelpers.getUser(username)
    .then((userRecord) => {
      if (authHelpers.isCorrect(password, userRecord.password)) {
        // Generate and save token:
        const token = localAuth.encodeToken(username);
        res.cookie('authToken', token);
        // Redirect to the beer list:
        res.redirect('/beer');
      } else {
        errorHelper.errorResponseHandler(res, 500, 'Please login with correct credential!');
      }
    })
    .catch(() => {
      errorHelper.errorResponseHandler(res, 500, 'Please login first');
    });
});

/**
 * This route stop a login session and redirect back to home:
 */
router.post('/logout', (req, res) => {
  console.log('logout');
  res.clearCookie('authToken');
  res.redirect('/');
});

module.exports = router;
