const { Op } = require('sequelize')
const db = require('../models/index')

class Account {
    constructor(accountName,custName,bankID,custID,balance){
        this.accountName = accountName
        this.custName = custName
        this.bankID = bankID
        this.custID = custID
        this.balance = balance
        }

    setAccountID (id) {
        this.id = id
    }

    createPayload () {
        return {
            acc_name: this.accountName,
            cust_name: this.custName,
            bank_id: this.bankID,
            cust_id: this.custID,
            balance: this.balance,
        }
      }

     async addAccount(transaction){
        try {
            const accounts = await db.accounts.create(this.createPayload(),{
                transaction: transaction
            })
            return accounts
        } catch (error) {
            console.error(error)
        }
    }
    
    static async getAccount(accountID){
        try {
        const result = await db.accounts.findOne({
            where:{
            id: accountID,
            }
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }


    static async updateAccount(transaction,accountID){
        try {
        const result = await db.accounts.update(this.createPayload(),{
            where:{
            id: accountID,
            },
            transaction: transaction
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteAccount(transaction,accountID) {
        try {
          const result = await db.accounts.destroy({
            where: {
            id: accountID,
            },
            transaction: transaction
          })
    
          return result
        } catch (error) {
          console.error(error)
        }
      }

        async deposit(transaction,accountID,customerID,bankID) {
        try {
            const result = await db.accounts.update(this.createPayload(),{
                where: {
                id: accountID,
                cust_id: customerID,
                bank_id: bankID
                },
                transaction: transaction
              })
        
              return result
        } catch (error) {
            
        }
      }
}
module.exports = {Account} 