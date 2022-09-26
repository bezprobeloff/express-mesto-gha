const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((films) => res.send({ data: films }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'ошибка' }));
};

module.exports = { getUsers, getUser, createUser };
