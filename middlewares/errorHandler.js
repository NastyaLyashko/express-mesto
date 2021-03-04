const { CelebrateError } = require('celebrate')

const errorHandler = (err, req, res, next) => {
    if(err instanceof CelebrateError){
        return res.status(400).send(err.details.get('body'));
    }
    if(err.status){
        return res.status(err.status).send({ message: err.message });
    }

    res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
}; 

module.exports = errorHandler;