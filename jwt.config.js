require('dotenv').config()

module.exports = {  
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtSession: {
        session: false
    }
}