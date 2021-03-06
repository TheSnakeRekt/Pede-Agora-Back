const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const JWT_SECRET = `0nHsn1*HrfFHa@hkC5pe20HHE5xTwh#P4u!%YWt%M#nhjpHxT5`;

class AuthenticationSystem {

    static async authenticate(inputPassword, instancePassword){
        try {
           let isValid = await bcrypt.compare(inputPassword, instancePassword);

           if(isValid){
            user.token = jwt.sign(user, JWT_SECRET, { expiresIn: '2h' });
            return {
                access:true,
                account:user
            }
           }
        } catch (error) {
            console.error(error);
        }
        return {access:false};
    }

    static async authenticate(inputPassword, instancePassword, user){
        
        try {
           let isValid = await bcrypt.compare(inputPassword, instancePassword);

           if(isValid){
            user.token = jwt.sign(user, JWT_SECRET, { expiresIn: '2h' });
            return {
                access:true,
                account:user
            }
           }
        } catch (error) {
            console.error(error);
        }
        return {access:false};
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

    static checkToken(header){
        if(typeof header == 'undefined' || header == ''){
            return false;
        }
        try {
            return jwt.verify(header, JWT_SECRET);
        } catch (error) {
            return false;
        }
    }

    static sign(user){
        user.token = jwt.sign(user, JWT_SECRET, { expiresIn: '2h' })
        return user;
    }
}

module.exports = AuthenticationSystem;