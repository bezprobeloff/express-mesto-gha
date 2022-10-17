const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const auth = require('../middlewares/auth');
const notFoundController = require('../controllers/notFoundController');
const { createUser, login } = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.post('/signin', celebrates.login, login);
router.post('/signup', celebrates.login, createUser);
// все роуты, кроме /signin и /signup защищены авторизацией
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, notFoundController);

module.exports = router;
