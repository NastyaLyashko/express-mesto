const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
      return res.status(500).send({ message: 'На сервере произошла ошибка 1' });
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
      return res.status(500).send({ message: 'На сервере произошла ошибка 2' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name: name,
      about: about,
      avatar: avatar,
      email: email,
      password: hash, 
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка 3' });
    });
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: err.message });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка 4' });
    });
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка 5' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}; 

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет такого пользователя');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, patchUser, patchAvatar, login, getUserInfo,
};
