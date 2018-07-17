const express = require('express');
const router = express.Router();

// Connection to db:
const knex = require('../db/knex');

/**
 * This route is at /beer. 
 * select the beer table,
 * get all the beers from the table,
 * render the 'list' view and pass in the beers
**/
router.get('/', (req, res) => {
  knex('beer')
    .select()
    .then(beers => {
      res.render('list', {beers: beers});
    })
});

/**
 * This route is at /new. 
**/
router.get('/new', (req, res) => {
  res.render('new');
});

module.exports = router;
