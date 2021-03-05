const Unauthorized = require('./Unauthorized');
const NotFound = require('./NotFound');
const BadRequest = require('./BadRequest');
const Forbidden = require('./Forbidden');
const Conflict = require('./Forbidden');

module.exports = {
  NotFound, Unauthorized, BadRequest, Forbidden, Conflict,
};
