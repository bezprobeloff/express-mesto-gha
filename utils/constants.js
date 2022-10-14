const path = require('path');

const regexImageLink = /^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im;
const regexLink = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.bezprobeloff.nomoredomains.icu',
  'http://api.mesto.bezprobeloff.nomoredomains.icu',
  'https://localhost:3000',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const PATH_MESTODB = 'mongodb://localhost:27017/mestodb';
const PATH_FRONTEND = path.join(__dirname, '../../frontend');

module.exports = {
  regexImageLink,
  regexLink,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  PATH_MESTODB,
  PATH_FRONTEND,
};
