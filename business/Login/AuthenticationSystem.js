const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const JWT_SECRET = `0nHsn1*HrfFHa@hkC5pe20HHE5xTwh#P4u!%YWt%M#nhjpHxT5`;

class AuthenticationSystem {
    static async authenticate(inputPassword, instancePassword = '123'){
        try {
           let hashedInput = await bcrypt.hash(inputPassword, JWT_SECRET);
           return await bcrypt.compare(instancePassword,hashedInput);
        } catch (error) {
            console.error(error);
        }
       
    }

    static async createPassword(inputPassword){
        try {
            return await bcrypt.hash(inputPassword, JWT_SECRET);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = AuthenticationSystem;