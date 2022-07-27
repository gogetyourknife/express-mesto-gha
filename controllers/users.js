const User = require('../models/user');

const ERROR = 400;
const ERR_CODE = 404;
const ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res
      .status(ERROR_CODE)
      .send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERR_CODE)
          .send({ message: 'Пользователь не найден' });
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then(() => res.send({ name, about }))
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

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then(() => res.send({ avatar }))
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