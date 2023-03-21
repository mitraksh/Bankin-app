const { Op } = require('sequelize')
const db = require('../models/index')
const JwtToken = require('../middleware/jwt')

class Credentials {
    constructor(firstName, lastName, email, password, isAdmin){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.isAdmin = isAdmin
        }

    setCredentialsID (id) {
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

    
    async getCredentials(){
        try {
        const result = await db.credentials.findOne({
            where:{
            id: 1,
            }
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }

    async updateCredentials(transaction){
        try {
        const result = await db.credentials.update(this.createPayload(),{
            where:{
            id: 1,
            },
            transaction: transaction
        })

        return result
            
        } catch (error) {
            console.error(error)
        }
    }


}
module.exports = {Credentials} 