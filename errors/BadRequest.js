const BaseError = require("./BaseError")
class BadRequest extends BaseError{
    constructor(errorMessage) {
        super(errorMessage, 400)
    }
}

class UnauthoirzedError extends BaseError{
    constructor(errorMessage) {
        super(errorMessage, 400)
    }
}

module.exports = {BadRequest,UnauthoirzedError}

