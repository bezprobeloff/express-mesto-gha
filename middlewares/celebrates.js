const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { regexImageLink, regexLink } = require('../utils/constants');

// его можно использовать и для создания юзера
const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexImageLink),
  }),
});

const getUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

const updateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexImageLink),
  }),
});

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
});

const checkIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

module.exports = {
  login, getUser, updateUser, updateAvatar, createCard, checkIdCard,
};
