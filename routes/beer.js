const express = require('express');
const router = express.Router();

// Get the helper functions:
const validateBeer = require('../lib/beerCheck').validateBeer;
const isValidID = require('../lib/beerCheck').isValidID;
const errorResponseHandler = require('../lib/errorHandlers').errorResponseHandler;

// Connect to query:
const query = require('../db/query');

// Routes here are with /beer path:

/**
 * This route gets all the beers:
 *  - select the beer table,
 *  - get all the beers from the table,
 *  - render the 'list' view and pass in the beers
**/
router.get('/', (req, res) => {
  query
    .getList()
    .then(beers => {
      res.render('list', {beers: beers});
    })
});

/**
 * This route start a form for new beer:
 *  - put before hte get-by-id to remove error
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
    query
      .create(beer)
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
    const id = req.params.id;
    query
      .update(id, beer)
      .then(() => {
        res.redirect(`/beer/${id}`);
      });
  });
});

/**
 * This route deletes a beer and redirect back to list: 
**/
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(isValidID(id)) {
    query
      .delete(id)
      .then(() => {
        res.redirect('/beer');
      });
  } else {
    errorResponseHandler(res, 500, 'Invalid beer ID! Cannot delete...');
  }
});

/**
 * This function renders a beer and provide response:
 *  - if beer ID is valid:
 *    - get the beer details with the ID
 *    - render the beer
 *  - if not:
 *    - 500 error
**/
function renderBeer(id, res, viewName) {
  if(isValidID(id)) {
    query
      .getBeer(id)
      .then(beer => {
        res.render(viewName, beer);
      });
  } else {
    errorResponseHandler(res, 500, 'Invalid beer ID! Cannot show...');
  }
}

module.exports = router;
