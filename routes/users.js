const router = require('express').Router();

const controllers = require('../controllers/users');

router.get('/users', controllers.getUsers);

router.get('/users/:id', controllers.getUser);

module.exports = router;
