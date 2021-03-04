class Forbidden extends Error {
    constructor(message) {
      super(message);

      this.message = message;
      this.status = 403;
    }
  }
  
  module.exports = Forbidden; 