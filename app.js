const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cardsData = require('./routes/cards');
const usersData = require('./routes/users');
const controllers = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 
const registerValidator = require('./middlewares/validators/register')

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', controllers.login);
app.post('/signup', registerValidator, controllers.createUser); 

app.use(auth);

app.use('/', cardsData);

app.use('/', usersData);

app.use(errors());

app.use(errorHandler);

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
