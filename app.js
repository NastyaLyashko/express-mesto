const express = require('express');
const path = require('path');
const cardsData = require('./routes/cards');
const usersData = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cardsData);

app.use('/', usersData);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
