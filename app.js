const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { PATH_MESTODB, PATH_FRONTEND } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const notFoundController = require('./controllers/notFoundController');
const { auth } = require('./middlewares/auth');
const celebrates = require('./middlewares/celebrates');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsPolicy } = require('./middlewares/corsPolicy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(PATH_MESTODB, {});

app.use(requestLogger);

app.use(express.static(PATH_FRONTEND));
app.use(corsPolicy);

// Удалить после сдачи проекта
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
//
app.post('/signin', celebrates.login, login);
app.post('/signup', celebrates.login, createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, notFoundController);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: err.message });
  }
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
