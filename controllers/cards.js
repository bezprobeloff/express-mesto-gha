const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  // временное решение вставки id пользователя
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка с указанным id не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректный формат id.' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректный формат id.' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректный формат id.' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
