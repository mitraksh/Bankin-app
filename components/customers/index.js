const express = require('express')
const {
  createCustomer,
  getCustomer,
  jwtLoginVerify,
  updateCustomers,
  deleteCustomers,
  getAllCustomers
} = require('./controller/customers.js')
const JwtToken = require('../../middleware/jwt')

const customerRouter = express.Router()

customerRouter.post('/', JwtToken.verify, createCustomer)
customerRouter.get('/:customerID', JwtToken.verify, getCustomer)
customerRouter.get('/', getAllCustomers)
customerRouter.post('/login', jwtLoginVerify)
customerRouter.put('/:customerID',JwtToken.verify, updateCustomers)
customerRouter.delete('/:customerID',JwtToken.verify, deleteCustomers)



module.exports = customerRouter
