const router = require('express').Router();

const controller = require('../controllers/cards');

router.get('/cards', controller.getCard);
router.post('/cards', controller.createCard);
router.delete('/cards/:cardId', controller.deleteCard);
router.put('/cards/:cardId/likes', controller.likeCard);
router.delete('/cards/:cardId/likes', controller.dislikeCard);

module.exports = router;
