const knex = require('../db/knex');
const localAuth = require('./localAuthentication');

/**
 * This function checks if the login username exists:
 *  - if exist, return the user record
**/
function getUser(username) {
  return knex('admin').where({username}).first();
}

/**
 * This function checks if the login credential is correct:
**/
function isCorrect(userPassword, databasePassword) {
  return (userPassword == databasePassword);
}

/**
 * This function checks if the current user session is an autherized employee:
 *  - Simplify the authentication checking session
 *  - only check if the token exists
**/
function isAuthed(req) {
  if (req.cookies.authToken) {
    console.log('Got the token!');
    return true;
    // var token = req.cookies.authToken;
    // localAuth.decodeToken(token, (err, payload) => {
    //   if (!err) {
    //     return knex('admin').where({username: payload.sub}).first()
    //     .then((user) => {
    //       console.log("match the user!!");
    //       console.log(user.username);
    //       return true;
    //     })
    //     .catch((err) => {
    //       return false;
    //     });
    //   }
    // });
  }
  return false;
}

module.exports = {
  getUser,
  isAuthed,
  isCorrect
};