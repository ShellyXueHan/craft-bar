const knex = require('../db/knex');
const localAuth = require('./localAuthentication');

function getUser(username) {
  return knex('admin').where({username}).first();
}

function isCorrect(userPassword, databasePassword) {
  return (userPassword == databasePassword);
}

function isAuthed(req) {
  var token = req.cookies.authToken;
  console.log(token);

  localAuth.decodeToken(token, err => {
    if (err) {
      console.log('Cannot generate token...');
      return false;
    }
  });
  return true;
}

module.exports = {
  getUser,
  isAuthed,
  isCorrect
};