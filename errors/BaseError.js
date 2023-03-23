class BaseError extends Error {
    constructor(errorMessage, statusCode) {
      super(errorMessage)
      this.statusCode = statusCode
    }
  }
  
  module.exports = BaseError