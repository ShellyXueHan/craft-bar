const express = require('express');
const router = express.Router();

// Get the beer functions:
const validateBeer = require('../scripts/beerCheck').validateBeer;
const isValidID = require('../scripts/beerCheck').isValidID;
const renderBeer = require('../scripts/beerCheck').renderBeer;
const isValidBeer = require('../scripts/beerCheck').isValidBeer;

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

module.exports = router;
