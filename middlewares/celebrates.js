const { celebrate, Joi } = require('celebrate');
const { regexAvatarLink } = require('../utils/constants');

const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexAvatarLink),
  }).unknown(true),
});

module.exports = { login };
