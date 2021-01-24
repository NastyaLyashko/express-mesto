const path = require('path');

const readJson = require('../utils/readJson');

const getCard = ('/cards', (req, res) => {
  readJson(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = { getCard };
