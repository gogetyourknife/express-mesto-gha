const router = require('express').Router();
const { cardSchemaValidate, likeSchemaValidate, cardDeleteSchemaValidate } = require('../utils/validation');

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard, cardSchemaValidate);
router.put('/:cardId/likes', likeCard, likeSchemaValidate);
router.delete('/:cardId/likes', dislikeCard, likeSchemaValidate);
router.delete('/:cardId', deleteCard, cardDeleteSchemaValidate);

module.exports = router;