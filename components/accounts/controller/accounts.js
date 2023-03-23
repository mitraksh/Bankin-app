const { StatusCodes } = require('http-status-codes')
const {
    addAccountService,
    getAccountService,
    updateAccountService,
    deleteAccountService,
    depositService,
    withdrawService,
    transferService,
    transferToOtherService,
} = require('../service/accounts')
const {
  getBankService,
  getAllBanksService
} = require('../../banks/service/banks')
const { Account } = require('../../../view/account')
const db = require('../../../models')


const createAccount = async (req, res, next) => {
  try {
    const adminLogin = req.locals.user.isAdmin
    const fullname = req.locals.firstName + " "+ req.locals.lastName 
    if(adminLogin == false){

    const { accountName,bankID } = req.body 
    const checkBank = await getBankService(bankID)
    if(checkBank){
      const account = new  Account(accountName,fullname,bankID,req.locals.user.id,1000)
      const accountData = await addAccountService(account)
      res.status(StatusCodes.CREATED).json(accountData)
    }else{
      const getallbanks = await getAllBanksService()
      res.status(StatusCodes.EXPECTATION_FAILED).send("Bank not found, try another bank from the list",getallbanks);
  
    }
    
    }else{
      res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can create their Accounts");
  
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getAccount = async (req, res, next) => {
  try {
    const accountData = await getAccountService(req.params.accountID)
    res.status(StatusCodes.OK).json(accountData)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const updateAccounts = async (req,res,next) => {
    try {
        const {name, abbreviation} = req.body
        const accountid = req.params.accountID
        const account = new Account(name, abbreviation)
        const accountData = await updateAccountService(account,accountid)
        res.status(StatusCodes.OK).json(accountData)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const deleteAccounts = async (req,res,next) => {
    try {
      const adminLogin = req.locals.user.isAdmin
    if(adminLogin == false){
        const accountid = req.params.accountID
        const accountData = await deleteAccountService(accountid)
        res.status(StatusCodes.OK).json(accountData)
      }else{
        res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can delete their Accounts");
    
      }

    } catch (error) {
        console.error(error)
        next(error)
    }
}

const depositAmount = async (req,res,next) =>{
    try {
      const adminLogin = req.locals.user.isAdmin
      const selfID = req.locals.user.id

    if(adminLogin == false){
      const {deposit,bankID} = req.body
      const getAccount = await getAccountService(req.params.accountID)
      console.log("getAccount",getAccount.balance)
      if(selfID == getAccount.cust_id){
        const newBalance = getAccount.balance + deposit
        const account = new Account(getAccount.acc_name,getAccount.cust_name,bankID,req.locals.user.id,newBalance)
        const depositIntoAccount = await depositService(account,req.params.accountID,req.locals.user.id,bankID)
        res.status(StatusCodes.OK).json(depositIntoAccount)
      }else{
        res.status(StatusCodes.OK).send("You cannot deposit into another customer's account")
      }
      
    }else{
      res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can DEPOSIT into their Accounts");
  
    }
    } catch (error) {
      console.error(error)
      next(error)
    }
}

const withdrawAmount = async (req,res,next) =>{
  try {
    const adminLogin = req.locals.user.isAdmin
    const selfID = req.locals.user.id

  if(adminLogin == false){
    const {withdraw,bankID} = req.body
    const accID = req.params.accountID
    const getAccount = await getAccountService(req.params.accountID)
    console.log("cust id",getAccount.cust_id)
    if(selfID == getAccount.cust_id){
      if((getAccount.balance - withdraw )<= 0){
        res.status(StatusCodes.OK).send("NO balance left in your Account!!! Transaction Failed")
        return 
      }
      const newBalance = getAccount.balance - withdraw
      const account = new Account(getAccount.acc_name,getAccount.cust_name,bankID,req.locals.user.id,newBalance)
      const withdrawFromAccount = await withdrawService(account,req.params.accountID,req.locals.user.id,bankID)
      res.status(StatusCodes.OK).json(withdrawFromAccount)
  
    }else{
      res.status(StatusCodes.OK).send("You cannot withdraw from another customer's account")

    }
   
  }else{
    res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can WITHDRAW into their Accounts");

  }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const transferToOthers = async (req,res,next) =>{
  const transaction = await db.sequelize.transaction()
  try {
    const adminLogin = req.locals.user.isAdmin
  if(adminLogin == false){
    const {transfer,toAccountID, custID, bankID} = req.body
    const accID = req.params.accountID
    if(toAccountID == accID){
      res.status(StatusCodes.EXPECTATION_FAILED).send("yOU CANNOT TRANSFER TO THE SAME ACCOUNT");
      return 
    }
    const getAccount = await getAccountService(req.params.accountID)
    const getToAccount = await getAccountService(toAccountID)
    if((getAccount.balance - withdraw )<= 0){
      res.status(StatusCodes.OK).send("NO balance left in your Account!!! Transaction Failed")
      return 
    }
    const newBalance = getAccount.balance - transfer
    const newToBalance = getToAccount.balance + transfer
    
    const account = new Account(getAccount.acc_name,getAccount.cust_name,getAccount.bank_id,req.locals.user.id,newBalance)
    const transferServices =  await transferService(account,accID,req.locals.user.id,bankID)
    res.status(StatusCodes.OK).json(transferServices)
    
    const accountTo = new Account(getToAccount.acc_name,getToAccount.cust_name,toAccountID,custID,newToBalance)
    const transferToOtherServices =  await transferService(accountTo,toAccountID,custID,bankID)

    await transaction.commit()
    res.status(StatusCodes.OK).json(transferToOtherServices)

  }else{
    res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can TRANSFER into their Accounts");

  }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  createAccount,
  getAccount,
  updateAccounts,
  deleteAccounts,
  depositAmount,
  withdrawAmount,
  transferToOthers
}
