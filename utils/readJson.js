const fs = require('fs').promises;

const errorInvalid = { message: 'Json is invalid' };
const errorNotFound = { message: 'file is not found' };

const readJson = (dataPath) => fs.readFile(dataPath)
  .catch(() => {
    throw errorNotFound;
  })
  .then((text) => {
    try {
      return JSON.parse(text);
    } catch (_) {
      throw errorInvalid;
    }
  });

module.exports = readJson;
