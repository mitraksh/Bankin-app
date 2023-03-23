require('dotenv').config()
const { Sequelize } = require('sequelize')

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: process.env.POSTGRES_DIALECT,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    logging: console.log
  }
)

module.exports = db
