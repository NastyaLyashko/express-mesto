const router = require('express').Router();

const controllers = require('../controllers/users');

router.get('/users', controllers.getUsers);

router.get('/users/me', controllers.getUserInfo);

router.get('/users/:userId', controllers.getUser);

router.patch('/users/me', controllers.patchUser);

router.patch('/users/me/avatar', controllers.patchAvatar);

module.exports = router;
