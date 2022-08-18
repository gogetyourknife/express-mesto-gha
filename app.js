const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { auth } = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');
const { userSchemaValidate, loginValidate } = require('./utils/validation');

const { PORT = 3000 } = process.env;

const NotFoundError = require('./utils/errors/not-found-404');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/signin', login, loginValidate);
app.post('/signup', createUser, userSchemaValidate);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Внутренняя ошибка сервера'
        : message,
    });
  next();
});

app.use(limiter);
app.listen(PORT);