module.exports = class ContaDTO {
    static mapper(password){
        return {
            password: password,
            access:`CLIENTE`
        }
    }
}