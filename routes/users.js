const router = require('express').Router();

const controllers = require('../controllers/users');

router.get('/users', controllers.getUsers);

router.get('/users/:userId', controllers.getUser);

router.post('/users', controllers.createUser);

router.patch('/users/me', controllers.patchUser);

router.patch('/users/me/avatar', controllers.patchAvatar);

module.exports = router;
