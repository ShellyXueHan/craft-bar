const errorResponseHandler = require('./errorHandlers');

/* no-restricted-globals */

/**
 * This function checks if the beer is valid:
 *  - not empty name
 *  - has a type as number
 *  - has non-empty brewery
 */
function isValidBeer(beer) {
  return typeof beer.name === 'string'
         && beer.name.trim() !== ''
         && typeof beer.brewery === 'string'
         && beer.brewery.trim() !== ''
         && typeof beer.type !== 'undefined'
         && !Number.isNaN(beer.type);
}

/**
 * This function checks if the beer is valid number:
 */
function isValidID(id) {
  return !Number.isNaN(id);
}

/**
 * This function validates a beer and provide response:
 *  - if beer is valid:
 *    - get the fields from request body (coorespond to the names in views)
 *    - callback
 *  - if not:
 *    - 500 error
 */
function validateBeer(req, res, callback) {
  console.log('validate beer');
  if (isValidBeer(req.body)) {
    const beer = {
      name: req.body.name,
      brewery: req.body.brewery,
      type: req.body.type,
      price: req.body.price,
    };
    callback(beer);
  } else {
    errorResponseHandler(res, 500, 'Invalid beer!');
  }
}

module.exports = {
  validateBeer,
  isValidID,
};
