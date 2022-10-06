const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrates.getUser, getUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
