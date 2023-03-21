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
    const accountupdate = await account.updateAccount(transaction,accountID)
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


module.exports = {
    addAccountService,
    getAccountService,
    updateAccountService,
    deleteAccountService,
}
