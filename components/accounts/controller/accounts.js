const { StatusCodes } = require('http-status-codes')
const {
    addAccountService,
    getAccountService,
    updateAccountService,
    deleteAccountService,
} = require('../service/accounts')
const {
  getBankService,
  getAllBanksService
} = require('../../banks/service/banks')
const { Account } = require('../../../view/account')

const createAccount = async (req, res, next) => {
  try {
    const adminLogin = req.locals.user.isAdmin
    const fullname = req.locals.firstName + " "+ req.locals.lastName 
    if(adminLogin == false){

    const { accountName,fullname,bankID } = req.body 
    const checkBank = await getBankService(bankID)
    if(checkBank){
      const account = new Account(accountName,fullname,bankID,req.locals.user.id,1000)
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

const depositAmount = async () =>{
  const transaction = await db.sequelize.transaction()
    try {
      const adminLogin = req.locals.user.isAdmin
    if(adminLogin == false){
      const {deposit,bankID} = req.body
      const accID = req.params.accountID
      const getAccount = await getAccountService(req.params.accountID)
      const newBalance = getAccount.balance + deposit
      const account = new Account(getAccount.acc_name,getAccount.cust_name,bankID,req.locals.user.id,newBalance)
      const depositMoney = await deposit(transaction,accID,req.locals.user.id,bankID) 
      await transaction.commit()

    }else{
      res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can DEPOSIT into their Accounts");
  
    }
    } catch (error) {
      console.error(error)
      next(error)
    }
}

const withdrawAmount = async () =>{
  const transaction = await db.sequelize.transaction()
  try {
    const adminLogin = req.locals.user.isAdmin
  if(adminLogin == false){
    const {withdraw,bankID} = req.body
    const accID = req.params.accountID
    const getAccount = await getAccountService(req.params.accountID)
    const newBalance = getAccount.balance - withdraw
    const account = new Account(getAccount.acc_name,getAccount.cust_name,bankID,req.locals.user.id,newBalance)
    const depositMoney = await account.deposit(transaction,accID,req.locals.user.id,bankID) 
    await transaction.commit()

  }else{
    res.status(StatusCodes.EXPECTATION_FAILED).send("Only Customers can WITHDRAW into their Accounts");

  }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const transferToOthers = async () =>{
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

    const newBalance = getAccount.balance - transfer
    const newToBalance = getToAccount.balance + transfer

    const account = new Account(getAccount.acc_name,getAccount.cust_name,bankID,req.locals.user.id,newBalance)
    const depositMoney = await account.deposit(transaction,accID,req.locals.user.id,bankID) 

    await transaction.commit()

    const accountTo = new Account(getToAccount.acc_name,getToAccount.cust_name,toAccountID,custID,newToBalance)
    const transferTo = await accountTo.deposit(transaction,accID,req.locals.user.id,bankID) 

    await transaction.commit()

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
