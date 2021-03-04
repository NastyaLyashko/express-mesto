const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFound, Unauthorized, BadRequest } = require('../errors');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFound ('Пользователи не найдены');
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if(!user) {
        throw new NotFound ('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'id not found' });
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  console.log({ name, about, avatar, email, password });
  bcrypt.hash(password, 10)
    .orFail(() => {
      throw new BadRequest ('BadRequest');
    })
    .then(hash => User.create({
      name: name,
      about: about,
      avatar: avatar,
      email: email,
      password: hash, 
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
    });
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound ('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: err.message });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
    });
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound ('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .orFail(() => {
      throw new Unauthorized ('Пользователь не зарегестрирован');
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
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
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers, getUser, createUser, patchUser, patchAvatar, login, getUserInfo,
};
