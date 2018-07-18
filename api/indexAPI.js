const express = require('express');

const router = express.Router();

// Routes here are with /api/v1 path:

/**
 * for API testing
 */
router.get('/', (req, res) => {
  res.status(200);
  res.json({
    title: 'Craft Beer World!',
  });
});

module.exports = router;
