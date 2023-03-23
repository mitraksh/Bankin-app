const { StatusCodes } = require('http-status-codes')
const {
    addBankService,
    getBankService,
    updateBankService,
    deleteBankService,
} = require('../service/banks')
const { Bank } = require('../../../view/bank')

const createBank = async (req, res, next) => {
  try {
    const adminLogin = req.locals.user.isAdmin
    console.log("admin or not",req.locals.user.isAdmin)  
    if(adminLogin == true){
    const { name, abbreviation } = req.body
    const bank = new Bank(name, abbreviation)
    const bankData = await addBankService(bank)
    
    res.status(StatusCodes.CREATED).json(bankData)
    }else{
      res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can create Banks");
  
      }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getBank = async (req, res, next) => {
  try {
    const bankData = await getBankService(req.params.bankID)
    res.status(StatusCodes.OK).json(bankData)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const updateBanks = async (req,res,next) => {
    try {
      const adminLogin = req.locals.user.isAdmin
      if(adminLogin == true){
        const {name, abbreviation} = req.body
        const bankID = req.params.userID
        const bank = new Bank(name, abbreviation)
        const bankData = await updateBankService(bank,bankID)
        res.status(StatusCodes.OK).json(bankData)
      }else{
        res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can update Banks");
    
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const deleteBanks = async (req,res,next) => {
    try {
      const adminLogin = req.locals.user.isAdmin
      if(adminLogin == true){
        const bankID = req.params.bankID
        // console.log(userID)
        const bankData = await deleteBankService(bankID)
        res.status(StatusCodes.OK).json(bankData)
      }else{
        res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can delete Banks");
    
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
  createBank,
  getBank,
  updateBanks,
  deleteBanks,
}
