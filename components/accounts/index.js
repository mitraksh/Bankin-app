const express = require('express')
const {
    createAccount,
    getAccount,
    updateAccounts,
    deleteAccounts,
    depositAmount,
    withdrawAmount,
    transferToOthers,
    getBankLedger,
    getPassbook,
    getBankLogs
} = require('./controller/accounts.js')
const JwtToken = require('../../middleware/jwt')

const accountRouter = express.Router()

accountRouter.post('/', JwtToken.verify, createAccount)
accountRouter.get('/:accountID', JwtToken.verify, getAccount)
accountRouter.get('/ledger/:bankID', JwtToken.verify, getBankLedger)
accountRouter.get('/passbook/:customerID', JwtToken.verify, getPassbook)
accountRouter.get('/logs/:bankID', JwtToken.verify, getBankLogs)
accountRouter.put('/deposit/:accountID', JwtToken.verify, depositAmount)
accountRouter.put('/withdraw/:accountID', JwtToken.verify, withdrawAmount)
accountRouter.put('/transfer/:accountID', JwtToken.verify, transferToOthers)
accountRouter.delete('/:accountID', JwtToken.verify, deleteAccounts)



module.exports = accountRouter
