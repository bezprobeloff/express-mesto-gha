const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const { PATH_MESTODB, PATH_FRONTEND } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsPolicy } = require('./middlewares/corsPolicy');
const routes = require('./routes');

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
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: err.message });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
