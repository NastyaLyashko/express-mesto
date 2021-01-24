const router = require('express').Router();

const path = require('path');

const readJson = require('../utils/readJson');

router.get('/users', (req, res) => {
  readJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      const userData = users.find((user) => user._id === id);
      if (!userData) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(userData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
