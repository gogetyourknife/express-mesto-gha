const Card = require('../models/card');

const ERROR = 400;
const ERR_CODE = 404;
const ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        res
          .status(ERR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res
      .status(ERROR_CODE)
      .send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный запрос' });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((user) => {
    if (!user) {
      res
        .status(ERR_CODE)
        .send({ message: 'Карточка не найдена' });
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res
        .status(ERROR)
        .send({ message: 'Некорректный запрос' });
    }
    return res
      .status(ERROR_CODE)
      .send({ message: 'Внутренняя ошибка сервера' });
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный запрос' });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (!user) {
        res
          .status(ERR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный запрос' });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Внутренняя ошибка сервера' });
    });
};