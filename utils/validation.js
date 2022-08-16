const { celebrate, Joi } = require('celebrate');
const regex = require('./regex');

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regex)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIdSchemaValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const profileSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarSchemaValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(regex)),
  }),
});

const cardSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(regex)),
  }),
});

const likeSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const cardDeleteSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValidate,
  userSchemaValidate,
  userIdSchemaValidate,
  profileSchemaValidate,
  avatarSchemaValidate,
  cardSchemaValidate,
  likeSchemaValidate,
  cardDeleteSchemaValidate,
};