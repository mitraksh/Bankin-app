const { Customer } = require('../../../view/customer')
const jwt = require('../../../middleware/jwt');
const db = require('../../../models')
const { Credentials } = require('../../../view/credentials')

const addCustomerService = async customer => {
  const transaction = await db.sequelize.transaction()
  try {
    await customer.doesEmailExist()
    const customerData = await customer.addCustomer(transaction)
    await transaction.commit()
    return customerData
  } catch (error) {
   console.error(error)
  }
}

const getCustomerService = async customerID => {
  try {
    const customerData = await Customer.getCustomer(customerID)
    return customerData
  } catch (error) {
    console.error(error)
  }
}


const updateCustomerService = async (customer,customerID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const customerupdate = await customer.updateCustomer(transaction,customerID)
    await transaction.commit()
    return customerupdate
  } catch (error) {
    console.error(error)
  }
}

const deleteCustomerService = async (customerID) => {
  const transaction = await db.sequelize.transaction()
  try {
    const customerdelete = await Customer.deleteCustomer(transaction,customerID)
    return customerdelete
  } catch (error) {
    console.error(error)
  }
}

const loginService = async (email,password) => {
  const transaction = await db.sequelize.transaction()
  try {
    const customerData = await Customer.getAllCustomers(email,password)
    // if(customerData){
    //   const credentials = new Credentials(customerData.first_name,customerData.last_name,customerData.email,customerData.password,customerData.is_admin)
    //   const setCredentials = await Credentials.updateCredentials(transaction,customerData)
  
    // }
    return customerData
    
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getAllCustomersService = async (email,password) => {
  try {
    // const customerData = await Customer.getAllCustomers()
    // res.status(StatusCodes.OK).json(customerData)
    const customerData = await Customer.getAllCustomers(email,password)
    return customerData
  } catch (error) {
      console.error(error)
      next(error)
  }
}


module.exports = {
    addCustomerService,
    getCustomerService,
    updateCustomerService,
    deleteCustomerService,
    loginService,
    getAllCustomersService
}
