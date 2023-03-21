const express = require('express')
const {
    createAccount,
    getAccount,
    updateAccounts,
    deleteAccounts,
    depositAmount,
    withdrawAmount,
    transferToOthers
} = require('./controller/accounts.js')
const JwtToken = require('../../middleware/jwt')

const accountRouter = express.Router()

accountRouter.post('/', JwtToken.verify, createAccount)
accountRouter.get('/:accountID', JwtToken.verify, getAccount)
accountRouter.put('/deposit/:accountID', JwtToken.verify, depositAmount)
accountRouter.put('/withdraw/:accountID', JwtToken.verify, withdrawAmount)
accountRouter.put('/transfer/:accountID', JwtToken.verify, transferToOthers)
accountRouter.delete('/:accountID', JwtToken.verify, deleteAccounts)



module.exports = accountRouter
