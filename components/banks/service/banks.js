const { Bank } = require('../../../view/bank')
const jwt = require('../../../middleware/jwt');
const db = require('../../../models')


const addBankService = async bank => {
  const transaction = await db.sequelize.transaction()
  try {
    const bankData = await bank.addBank(transaction)
    await transaction.commit()
    return bankData
  } catch (error) {
   console.error(error)
  }
}

const getBankService = async bankID => {
  try {
    const bankData = await Bank.getBank(bankID)
    return bankData
  } catch (error) {
    console.error(error)
  }
}

const getAllBanksService = async () => {
  try {
    const bankData = await Bank.getAllBanks()
    return bankData
  } catch (error) {
    console.error(error)
  }
}


const updateBankService = async (bank,bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const bankupdate = await bank.updateBank(transaction,bankID)
    await transaction.commit()
    return bankupdate
  } catch (error) {
    console.error(error)
  }
}

const deleteBankService = async (bankID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const bankdelete = await Bank.deleteBank(transaction,bankID)
    return bankdelete
  } catch (error) {
    console.error(error)
  }
}


module.exports = {
    addBankService,
    getBankService,
    getAllBanksService,
    updateBankService,
    deleteBankService,
}
