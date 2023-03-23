const { Op } = require('sequelize')
const db = require('../models/index')

class Transactions {
    constructor(custID,toCustID,accID,toAccID,bankID,toBankID,amount,txType){
        this.custID = custID
        this.toCustID = toCustID
        this.accID = accID
        this.toAccID = toAccID
        this.bankID = bankID
        this.toBankID = toBankID
        this.amount = amount
        this.txType = txType
        }

    setTransactionsID (id) {
        this.id = id
    }

    createPayload () {
        return {
            cust_id: this.custID,
            to_cust_id: this.toCustID,
            acc_id: this.accID,
            to_acc_id: this.toAccID,
            bank_id: this.bankID,
            to_bank_id: this.toBankID,
            amount: this.amount,
            tx_type: this.txType,
        }
    }


      async addTransaction(transaction){
        try {
            const result = await db.transaction.create(this.createPayload(),{
                transaction: transaction
              })
        
            return result
        } catch (error) {
          console.error(error)
        }
      }

      async toaddTransaction(transaction){
        try {
            const result = await db.transaction.create(this.createPayload(),{
                transaction: transaction
              })
        
            return result
        } catch (error) {
          console.error(error)
        }
      }

      async getAllTransactions(){
        try {
            const result = await db.transaction.findAll()
        
            return result
        } catch (error) {
            console.error(error)
        }
      }

      static async getTransactionsbyCustID(custID){
        try {
            const result = await db.transaction.findAll({
                where:{
                id: custID,
                }
            })
        
            return result
        } catch (error) {
            console.error(error)
        }
      }

      static async getTransactionsbyAccID(accID){
        try {
            const result = await db.transaction.findAll({
                where:{
                id: accID,
                }
            })
        
            return result
        } catch (error) {
            console.error(error)
        }
      }

      static async getTransactionsbyBankID(bankID){
        try {
            const result = await db.transaction.findAll({
                where:{
                id: bankID,
                }
            })
        
            return result
        } catch (error) {
            console.error(error)
        }
      }
}
module.exports = {Transactions} 