// Connection to db:
const knex = require('../db/knex');

/**
 * This function validates a beer and provide response:
 *  - if beer is valid:
 *    - get the fields from request body (coorespond to the names in views)
 *    - callback
 *  - if not:
 *    - 500 error
**/
function validateBeer(req, res, callback) {
  console.log('validate beer');
  if(isValidBeer(req.body)) {
    const beer = {
      name: req.body.name,
      brewery: req.body.brewery,
      type: req.body.type,
      price: req.body.price
    };
    callback(beer);
  } else {
    res.status(500);
    res.render('error', { message: 'Invalid id in 1!'});
  }
}

/**
 * This function renders a beer and provide response:
 *  - if beer ID is valid:
 *    - get the beer details with the ID
 *    - render the beer
 *  - if not:
 *    - 500 error
**/
function renderBeer(id, res, viewName) {
  console.log('render beer');
  if(isValidID(id)) {
    knex('beer')
      .select()
      .where('id', id)
      .first()
      .then(beer => {
        res.render(viewName, beer);
      });
  } else {
    res.status(500);
    res.render('error', { message: 'Invalid id in 2!'});
  }
}

/**
 * This function checks if the beer is valid:
 *  - not empty name
 *  - has a type as number
 *  - has non-empty brewery
 * 
**/
function isValidBeer(beer) {
  console.log('check beer');
  return typeof beer.name == 'string' &&
          beer.name.trim() != '' &&
          typeof beer.brewery == 'string' &&
          beer.brewery.trim() != '' &&
          typeof beer.type != 'undefined' &&
          !isNaN(beer.type);
}

/**
 * This function checks if the beer is valid number:
**/
function isValidID(id) {
  console.log('check id');
  return !isNaN(id);
}

module.exports = {
  validateBeer,
  isValidID,
  renderBeer,
  isValidBeer
};
