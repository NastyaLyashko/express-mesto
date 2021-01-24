const router = require('express').Router();

const controller = require('../controllers/cards');

router.get('/cards', controller.getCard);

module.exports = router;
