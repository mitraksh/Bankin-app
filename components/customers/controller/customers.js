const { StatusCodes } = require('http-status-codes')
const {
    addCustomerService,
    getCustomerService,
    updateCustomerService,
    deleteCustomerService,
    loginService,
    getAllCustomersService
} = require('../service/customers')
const { Customer } = require('../../../view/customer')
const JwtToken = require('../../../middleware/jwt')
const { Credentials } = require('../../../view/credentials')

const createCustomer = async (req, res, next) => {
  try {
    const adminLogin = req.locals.isAdmin
    if(adminLogin == "true"){
      const { firstName, lastName, email, password, isAdmin } = req.body
    const customer = new Customer(firstName, lastName, email, password, isAdmin)
    const customerData = await addCustomerService(customer)
    
    res.status(StatusCodes.CREATED).json(customerData)
    }else{
    res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can create Customers");

    }
    
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getCustomer = async (req, res, next) => {
  try {
    const customerData = await getCustomerService(req.params.customerID)
    const reqlocal = req.locals
    // console.log("reqlocal",reqlocal)
    res.status(StatusCodes.OK).json(customerData)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const jwtLoginVerify = async (req, res, next) => {
  try {
    const {email,password} = req.body
    const login = await loginService(email,password)
    // console.log(login)
    if(login){
      const jwt = new JwtToken(login.id, login.first_name, login.last_name, login.email, login.is_admin)
      const token = jwt.generate()
      console.log(token)
      res.cookie("authorization", token)
      res.status(StatusCodes.OK).json(token)
    }else if(login == null){
      res.status(StatusCodes.EXPECTATION_FAILED).json(login)
    }

  } catch (error) {
    console.error(error)
    next(error)
  }
}

const updateCustomers = async (req,res,next) => {
    try {
      const adminLogin = req.locals.isAdmin
      if(adminLogin == "true"){
        const {firstName, lastName, email, password} = req.body
        const customerID = req.params.userID
        const customer = new Customer(firstName, lastName, email, password)
        const customerData = await updateCustomerService(user,userID)
        res.status(StatusCodes.OK).json(customerData)
      }else{
        res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can update Customers");
    
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const deleteCustomers = async (req,res,next) => {
    try {
      const adminLogin = req.locals.isAdmin
      if(adminLogin == "true"){
        const customerID = req.params.customerID
        // console.log(userID)
        const customerData = await deleteCustomerService(customerID)
        res.status(StatusCodes.OK).json(customerData)
      }else{
        res.status(StatusCodes.EXPECTATION_FAILED).send("Only Admin can delete Customers");
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getAllCustomers = async (req,res,next) => {
  try {
    const customerData = await getAllCustomersService()
    res.status(StatusCodes.OK).json(customerData)
  } catch (error) {
      console.error(error)
      next(error)
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  jwtLoginVerify,
  updateCustomers,
  deleteCustomers,
  getAllCustomers,
}
