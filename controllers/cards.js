const mongoose = require('mongoose');
const Card = require('../models/card');

const getCard = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new Error('404');
    })
    .populate('user')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('404');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'not found' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'id not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('404');
    })
    .then((card) => res.send(card))
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('404');
    })
    .then((card) => res.send({ data: card }))
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
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
