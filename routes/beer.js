const express = require('express');
const router = express.Router();

// Connection to db:
const knex = require('../db/knex');

// Routes here are with /beer path:

/**
 * This route gets all the beers:
 *  - select the beer table,
 *  - get all the beers from the table,
 *  - render the 'list' view and pass in the beers
**/
router.get('/', (req, res) => {
  knex('beer')
    .select()
    .then(beers => {
      res.render('list', {beers: beers});
    })
});

/**
 * This route start a form for new beer: 
**/
router.get('/new', (req, res) => {
  res.render('new');
});

/**
 * This route shows a beer in detail view: 
**/
router.get('/:id', (req, res) => {
  const id = req.params.id;
  renderBeer(id, res, 'detail');
});

/**
 * This route show a beer for edit: 
**/
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  renderBeer(id, res, 'edit');
});

/**
 * This route psot a new beer and redirect to the newly create beer view:
**/
router.post('/', (req, res) => {
  validateBeer(req, res, (beer) => {
    knex('beer')
      .insert(beer, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/beer/${id}`);
      });
  });
});

/**
 * This route update a beer and show the updated beer:
**/
router.put('/:id', (req, res) => {
  validateBeer(req, res, (beer) => {
    console.log(beer);
    const id = req.params.id;
    knex('beer')
      .where('id', id)
      .update(beer, 'id')
      .then(() => {
        res.redirect(`/beer/${id}`);
      });
  });
});

/**
 * This route deletes a beer and redirect back to list: 
**/
router.delete('/:id', (req, res) => {
  console.log('delete the beer');
  const id = req.params.id;
  if(isValidID(id)) {
    knex('beer')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/beer');
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id!'
    });
  }
});


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

module.exports = router;
