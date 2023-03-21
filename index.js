require('dotenv').config()
const express = require('express')
const app = express()
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")
const JwtToken = require("./middleware/jwt")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./db/connect')
const router = require('./components')

app.use(
  cors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Set-Cookie', 'X-Total-Count']
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials', true)
  next()    
})

app.get('/', (req, res) => {
  try {
    db.authenticate()
    console.log('DB Connected')
    res.send('Welcome to My Bank')
    
  } catch (e) {
    res.send(e)
  }
})

app.use('/api/v1/', router)

// app.get("/login", (req, res, next) => {
//   next()
//   res.send("JSON WEB TOKEN")
// }, () => {
//   console.log("next");
// })

app.use(errorHandlerMiddleware)
app.use("*", (req, res) => {
  // not found
  res.status(404).json()
})

const startApp = () => {
  try {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, console.log(`Server started at port ${PORT}`))
  } catch (error) {
    console.error(error)
  }
}

startApp()
