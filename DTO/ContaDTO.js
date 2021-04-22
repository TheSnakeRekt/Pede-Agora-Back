module.exports = class ContaDTO {
    static mapper(conta,token){
        return {
            password: conta.password,
            access: conta.access,
            verified: false,
            verifyCode: token
        }
    }
}