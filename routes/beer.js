const express = require('express');

const router = express.Router();
// Get the helper functions:
const beerCheckHelper = require('../lib/beerCheck').validateBeer;
const errorHelper = require('../lib/errorHandlers');
const authHelpers = require('../lib/authChecks');

// Connect to query:
const query = require('../db/query');

// Routes here are with /beer path:

/**
 * This function renders a beer and provide response:
 *  - if beer ID is valid:
 *    - get the beer details with the ID
 *    - render the beer
 *  - if not:
 *    - 500 error
 */
function renderBeer(id, res, viewName, isAuthed) {
  if (beerCheckHelper.isValidID(id)) {
    query
      .getBeer(id)
      .then((beer) => {
        // beer.isAuthed = isAuthed;
        res.render(viewName, { beer, isAuthed });
      });
  } else {
    errorHelper.errorResponseHandler(res, 500, 'Invalid beer ID! Cannot show...');
  }
}

/**
 * This route gets all the beers:
 *  - select the beer table,
 *  - get all the beers from the table,
 *  - render the 'list' view and pass in the beers
 *  - check if user is employee:
 *    - show create button is yes
 */
router.get('/', (req, res) => {
  const isAuthed = authHelpers.isAuthed(req);
  query
    .getList()
    .then((beers) => {
      res.render('list', { beers, isAuthed });
    });
});

/**
 * This route start a form for new beer:
 *  - put before hte get-by-id to remove error
 */
router.get('/new', (req, res) => {
  res.render('new');
});

/**
 * This route shows a beer in detail view:
 *  - check if user is employee:
 *    - show eidt & delete button
 */
router.get('/:id', (req, res) => {
  const { id } = req.params.id;
  const isAuthed = authHelpers.isAuthed(req);
  renderBeer(id, res, 'detail', isAuthed);
});

/**
 * This route show a beer for edit:
 *  - assume user will not access this api unauthrized:
 */
router.get('/:id/edit', (req, res) => {
  const { id } = req.params.id;
  renderBeer(id, res, 'edit', true);
});

/**
 * This route psot a new beer and redirect to the newly create beer view:
 */
router.post('/', (req, res) => {
  beerCheckHelper.validateBeer(req, res, (beer) => {
    query
      .create(beer)
      .then((ids) => {
        const id = ids[0];
        res.redirect(`/beer/${id}`);
      });
  });
});

/**
 * This route update a beer and show the updated beer:
 */
router.put('/:id', (req, res) => {
  beerCheckHelper.validateBeer(req, res, (beer) => {
    const { id } = req.params.id;
    query
      .update(id, beer)
      .then(() => {
        res.redirect(`/beer/${id}`);
      });
  });
});

/**
 * This route deletes a beer and redirect back to list:
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params.id;
  if (beerCheckHelper.isValidID(id)) {
    query
      .delete(id)
      .then(() => {
        res.redirect('/beer');
      });
  } else {
    errorHelper.errorResponseHandler(res, 500, 'Invalid beer ID! Cannot delete...');
  }
});

module.exports = router;
