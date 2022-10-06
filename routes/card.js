const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const celebrates = require('../middlewares/celebrates');

router.get('/', getCards);

router.post('/', celebrates.createCard, createCard);

router.delete('/:cardId', celebrates.checkIdCard, deleteCard);

router.put('/:cardId/likes', celebrates.checkIdCard, likeCard);

router.delete('/:cardId/likes', celebrates.checkIdCard, dislikeCard);

module.exports = router;
