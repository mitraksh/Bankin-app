const express = require('express')
const {
    createBank,
    getBank,
    updateBanks,
    deleteBanks,
} = require('./controller/banks.js')
const JwtToken = require('../../middleware/jwt')

const bankRouter = express.Router()

bankRouter.post('/', JwtToken.verify, createBank)
bankRouter.get('/:bankID', JwtToken.verify, getBank)
bankRouter.put('/:bankID', JwtToken.verify, updateBanks)
bankRouter.delete('/:bankID', JwtToken.verify, deleteBanks)



module.exports = bankRouter
