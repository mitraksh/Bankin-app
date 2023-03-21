const { Op } = require('sequelize')
const db = require('../models/index')
const JwtToken = require('../middleware/jwt')
const BankingAppError = require("../errors")

class Customer {
    constructor(firstName, lastName, email, password, isAdmin){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.isAdmin = isAdmin
        }

    setCustomerID (id) {
        this.id = id
    }

    createPayload () {
        return {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            is_admin: this.isAdmin,
        }
      }

      async doesEmailExist() {
        try {
          const findEmail = await db.customer.findOne({
            where: {
              email: this.email,
            }
          })
    
          if (findEmail) {
            throw new BankingAppError.BadRequest("Customer email already exists. Please try another email")
          }
        } catch (error) {
          throw new BankingAppError.BadRequest(error)
        }
      }  

    async addCustomer(transaction){
        try {
            const customers = await db.customer.create(this.createPayload(),{
                transaction: transaction
            })
            return customers
        } catch (error) {
            console.error(error)
        }
    }
    
  
    static async getAllCustomers(email,password){
        try {
            const result = await db.customer.findOne({
                where: {
                  email: email,
                  password: password
                }
            })

            return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async getCustomer(customerID){
      try {
      const result = await db.customer.findOne({
          where:{
          id: customerID,
          is_admin: "false"
          }
      })

      return result
          
      } catch (error) {
          console.error(error)
      }
  }


    static async updateCustomer(transaction,customerID){
        try {
        const result = await db.customer.update(this.createPayload(),{
            where:{
            id: customerID,
            is_admin: "false"
            },
            transaction: transaction
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteCustomer (transaction,customerID) {
        try {
          const result = await db.customer.destroy({
            where: {
              id: customerID,
            is_admin: "false"
            },
            transaction: transaction
          })
    
          return result
        } catch (error) {
          console.error(error)
        }
      }

}
module.exports = {Customer} 