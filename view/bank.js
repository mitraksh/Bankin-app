const { Op } = require('sequelize')
const db = require('../models/index')

class Bank {
    constructor(name,abbreviation){
        this.name = name
        this.abbreviation = abbreviation
        }

    setBankID (id) {
        this.id = id
    }

    createPayload () {
        return {
            name: this.name,
            abbreviation: this.abbreviation,
        }
      }

     async addBank(transaction){
        try {
            const banks = await db.bank.create(this.createPayload(),{
                transaction: transaction
            })
            return banks
        } catch (error) {
            console.error(error)
        }
    }
    
    static async getBank(bankID){
        try {
        const result = await db.bank.findOne({
            where:{
            id: bankID,
            },
            attributes: ['id','name','abbreviation']
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async getAllBanks(){
        try {
        const result = await db.bank.findAll({
            attributes: ['id','name','abbreviation']
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async updateBank(transaction,bankID){
        try {
        const result = await db.bank.update(this.createPayload(),{
            where:{
            id: bankID,
            },
            transaction: transaction
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteBank(transaction,bankID) {
        try {
          const result = await db.bank.destroy({
            where: {
                id: bankID,
            },
            transaction: transaction
          })
    
          return result
        } catch (error) {
          console.error(error)
        }
      }

}
module.exports = {Bank} 