const express = require('express');

const router = express.Router();
// Get the helper functions:
const beerCheckHelper = require('../lib/beerCheck');
const errorHelper = require('../lib/errorHandlers');

// Connect to query:
const query = require('../db/query');

// Routes here are with /api/v1/beer path:

/**
 * for API testing
 */

// Return the count of all beers:
router.get('/list', (req, res) => {
  query
    .getList()
    .then((beers) => {
      const beerTotal = beers.length;
      res.status(200);
      res.json({
        beerTotal,
      });
    });
});

// Return the id of the selected beer:
router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (beerCheckHelper.isValidID(id)) {
    query
      .getBeer(id)
      .then((beer) => {
        res.status(200);
        res.json({
          beerID: beer.id,
        });
      })
      .catch((err) => {
        res.status(404);
        res.json({
          error: 'Does not exist!',
        });
      });
  } else {
    res.status(400);
    res.json({
      error: 'Invalid beer ID!',
    });
  }
});

// Return status of creation:
router.post('/', (req, res) => {
  beerCheckHelper.validateBeer(req, res, (beer) => {
    query
      .create(beer)
      .then((ids) => {
        const id = ids[0];
        res.status(204);
      });
  });
});

// Return status of update:
router.put('/:id', (req, res) => {
  beerCheckHelper.validateBeer(req, res, (beer) => {
    const id = req.params.id;
    query
      .update(id, beer)
      .then(() => {
        res.status(204);
      });
  });
});

// Return status of deletion:
router.delete('/:id', (req, res) => {
  if (beerCheckHelper.isValidID(req.params.id)) {
    query
      .delete(req.params.id)
      .then(() => {
        res.status(200);
      });
  } else {
    res.status(500);
    res.json({
      error: 'Invalid beer ID! Cannot delete...',
    });
  }
});

module.exports = router;
