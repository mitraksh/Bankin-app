const { Op } = require('sequelize')
const db = require('../models/index')
const sequelize = require('sequelize');


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
                },
                attributes: ['cust_id', 'to_cust_id','acc_id','to_acc_id','bank_id','to_bank_id','amount','tx_type']
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
                acc_id: accID,
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
                bank_id: bankID,
                to_bank_id: {[Op.not]: null}
                },
                attributes: [ "bank_id",
                "to_bank_id",
                "amount",
                "tx_type",
                "createdAt"],
                include: [{
                  model: db.bank,
                  attributes: ['name'],
                }],
            })
        
            return result
        } catch (error) {
            console.error(error)
        }
      }

      static async getBankLogs(bankID,fromDate,toDate){
        try {
            const result = await db.transaction.findAll({
                where:{
                bank_id: bankID,
                to_bank_id: {[Op.not]: null},
                // created_at: { [Op.gt]: fromDate },
                created_at: { [Op.between]: [fromDate, toDate] },
                // [Op.and]: [
                // sequelize.where(sequelize.fn('date', sequelize.col('created_at')), '=', date)
                // ]  
              },
                attributes: [
                "to_bank_id",
                "amount",
                "tx_type",
                "created_at"],
                include: [{
                  model: db.bank,
                  attributes: ['name'],
                }],
            })
        
            return result
        } catch (error) {
            console.error(error)
        }
      }
}
module.exports = {Transactions} 