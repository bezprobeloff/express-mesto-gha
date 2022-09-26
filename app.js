const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6331448b2410b6017d8255eb',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
