const jwt = require('jsonwebtoken')
const {UnauthoirzedError} = require('../errors')

class JwtToken{
    constructor(id,firstName,lastName,email,isAdmin){
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.isAdmin = isAdmin
    }
    generate(){
        const token = jwt.sign(JSON.stringify(this), "my_jwt_secret_key");
        return token
    }
    static async verify(req,res,next){
        console.log(req.cookies);
        const tokenValue = req.cookies["authorization"]
        console.log("tokenValue", tokenValue);
        if (!tokenValue) {
          console.log("token not found");
          throw new UnauthoirzedError("JWT Token not found")
        }
        const obj = await jwt.verify(tokenValue, "my_jwt_secret_key")
        console.log(obj);
        if(typeof req.locals == 'object'){
            req.locals.user = obj
        }else{
            req.locals = {user:obj}
        }
        // console.log(res.locals.user)
        next()
    }
}
module.exports = JwtToken