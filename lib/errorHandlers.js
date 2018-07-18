/**
 * This handler provides error message with code:
 */
function errorResponseHandler(res, statusCode, msg) {
  res.status(statusCode);
  res.render('error', { msg, statusCode });
}

module.exports = {
  errorResponseHandler,
};
