const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
    body: {
        email: Joi.string().required().custom((value, helper)=>{
            if(validator.isEmail(value)) {
                return value
            }
            return helper.message('Невалидный email')
        }).message({
            'any.required': 'Обязательное поле'
        }),
        password: Joi.string().required().min(8).message({
            'sting.min': 'Минимум 8 символов',
            'any.required': 'Обязательное поле'
        })
    }
})

module.exports = register;