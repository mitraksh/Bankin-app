const { Account } = require('../../../view/account')
const jwt = require('../../../middleware/jwt');
const db = require('../../../models')


const addAccountService = async account => {
  const transaction = await db.sequelize.transaction()
  try {
    const accountData = await account.addAccount(transaction)
    await transaction.commit()
    return accountData
  } catch (error) {
   console.error(error)
  }
}

const getAccountService = async accountID => {
  try {
    const accountData = await Account.getAccount(accountID)
    return accountData
  } catch (error) {
    console.error(error)
  }
}


const updateAccountService = async (account,accountID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const accountupdate = await Account.deposit(transaction,accountID)
    await transaction.commit()
    return accountupdate
  } catch (error) {
    console.error(error)
  }
}

const deleteAccountService = async (accountID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const accountdelete = await Account.deleteAccount(transaction,accountID)
    return accountdelete
  } catch (error) {
    console.error(error)
  }
}

const depositService = async (account,accountID,customerID,bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const depositMoney = await account.deposit(transaction,accountID,customerID,bankID) 
    await transaction.commit()
    return depositMoney
  } catch (error) {
    console.error(error)
  }
}

const withdrawService = async (account,accountID,customerID,bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const withdrawMoney = await account.deposit(transaction,accountID,customerID,bankID) 
    await transaction.commit()
    return withdrawMoney
  } catch (error) {
    console.error(error)
  }
}

const transferService = async (account,accountID,customerID,bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const fromSelf = await account.deposit(transaction,accountID,customerID,bankID) 
    await transaction.commit()
    return fromSelf
  } catch (error) {
    console.error(error)
  }
}
const transferToOtherService = async (account,accountID,customerID,bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const transferTo = await account.deposit(transaction,accountID,customerID,bankID) 
    await transaction.commit()
    return transferTo
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
    addAccountService,
    getAccountService,
    updateAccountService,
    deleteAccountService,
    depositService,
    withdrawService,
    transferService,
    transferToOtherService,
}
