const NotFoundError = require('../errors/NotFoundError');

const notFoundController = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = notFoundController;
