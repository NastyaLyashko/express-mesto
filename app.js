const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsData = require('./routes/cards');
const usersData = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6016802dea64eb19d0fc8d4b',
  };

  next();
});

app.use('/', cardsData);

app.use('/', usersData);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
