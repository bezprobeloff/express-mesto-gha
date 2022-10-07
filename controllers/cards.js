const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(
          'Переданы некорректные данные при создании карточки.',
        ));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;

  // сначала проверим наличие карточки и прав на удаление
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          'Карточка с указанным id не найдена.',
        );
      }
      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('Отсутствие прав на удаление карточки.');
      }

      // уже можно удалить карточку
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Некорректный формат id.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          'Передан несуществующий id карточки',
        );
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(
          'Переданы некорректные данные для постановки/снятии лайка.',
        ));
      } else if (err.kind === 'ObjectId') {
        next(new ValidationError('Некорректный формат id.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          'Передан несуществующий id карточки',
        );
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(
          'Переданы некорректные данные для постановки/снятии лайка.',
        ));
      } else if (err.kind === 'ObjectId') {
        next(new ValidationError('Некорректный формат id.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
