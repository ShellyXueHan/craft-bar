const moment = require('moment');
const jwt = require('jwt-simple');
// Temperaily putting a token secret here:
process.env.TOKEN_SECRET = '123';

/**
 * Token encoding/decoding:
 *  -  reference: https://github.com/mjhea0/node-token-auth
**/
function encodeToken(userName) {
  const playload = {
    exp: moment().add(2, 'days').unix(),
    iat: moment().unix(),
    sub: userName
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

module.exports = {
  encodeToken,
  decodeToken
};