const router = require('express').Router();
const { postCardValidator, cardIdValidator } = require('../middlewares/validators/cardsValidator');

const controller = require('../controllers/cards');

router.get('/cards', controller.getCard);
router.post('/cards', postCardValidator, controller.createCard);

router.delete('/cards/:cardId', cardIdValidator, controller.deleteCard);
router.put('/cards/:cardId/likes', cardIdValidator, controller.likeCard);
router.delete('/cards/:cardId/likes', cardIdValidator, controller.dislikeCard);

module.exports = router;
