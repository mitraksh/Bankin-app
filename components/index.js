const express = require('express')
const customerRouter = require('./customers')
const bankRouter = require('./banks')
const accountRouter = require('./accounts')



const router = express.Router()

router.use('/customers', customerRouter)
router.use('/banks', bankRouter)
router.use('/accounts', accountRouter)

module.exports = router
