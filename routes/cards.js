const router = require('express').Router();

const path = require('path');

const readJson = require('../utils/readJson');

router.get('/cards', (req, res) => {
  readJson(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
