const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-401');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходимо авторизоваться в приложении');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться в приложении'));
  }

  req.user = payload;
  next();
};