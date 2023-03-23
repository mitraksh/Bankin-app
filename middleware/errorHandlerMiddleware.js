const BaseError = require('../errors/BaseError')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
   if(err instanceof BaseError){
        return res.status(err.statusCode).json({ error: err.message })
   } 
   return res.status(501).json({ error: err.message })

}
module.exports = errorHandlerMiddleware