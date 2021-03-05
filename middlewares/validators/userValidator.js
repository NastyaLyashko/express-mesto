const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

const userIdValidator = celebrate({
  params: {
    _id: Joi.string().required().custom((value, helper) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helper.message('Такого пользователя нет');
    }),
  },
});

const patchUserValidator = celebrate({
  body: {
    name: Joi.string().required().min(2).messages({
      'sting.min': 'Минимум 2 символа',
      'any.required': 'Обязательное поле',
    }),
    about: Joi.string().required().min(2).messages({
      'sting.min': 'Минимум 2 символа',
      'any.required': 'Обязательное поле',
    }),
  },
});

const patchAvatarValidator = celebrate({
  body: {
    avatar: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

module.exports = {
  userIdValidator,
  patchUserValidator,
  patchAvatarValidator,
};
