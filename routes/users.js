const router = require('express').Router();
const { userIdValidator, patchUserValidator, patchAvatarValidator } = require('../middlewares/validators/userValidator');

const controllers = require('../controllers/users');

router.get('/users', controllers.getUsers);

router.get('/users/me', controllers.getUserInfo);

router.get('/users/:userId', userIdValidator, controllers.getUser);

router.patch('/users/me', patchUserValidator, controllers.patchUser);

router.patch('/users/me/avatar', patchAvatarValidator, controllers.patchAvatar);

module.exports = router;
