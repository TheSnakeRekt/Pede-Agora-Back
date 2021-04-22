const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const JWT_SECRET = `0nHsn1*HrfFHa@hkC5pe20HHE5xTwh#P4u!%YWt%M#nhjpHxT5`;

class AuthenticationSystem {
    static async authenticate(inputPassword, instancePassword = '123'){
        try {
           let hashedInput = await bcrypt.hash(inputPassword, 12);
           return await bcrypt.compare(instancePassword,hashedInput);
        } catch (error) {
            console.error(error);
        }
       
    }

    static async createPassword(inputPassword){
        try {
            return await bcrypt.hash(inputPassword, 12);
        } catch (error) {
            console.error(error);
        }
    }

    static randomToken(){
        return crypto.randomBytes(16).toString('hex');
    }
}

module.exports = AuthenticationSystem;