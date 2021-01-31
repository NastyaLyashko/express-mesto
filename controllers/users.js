const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      throw new Error('404');
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'id not found' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'id not found' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'id not found' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getUser, createUser, patchUser, patchAvatar,
};
