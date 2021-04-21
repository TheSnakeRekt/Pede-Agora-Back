module.exports = class ContaDTO {
    static mapper(conta){
        return {
            password: conta.password,
            access: conta.access
        }
    }
}