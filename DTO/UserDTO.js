module.exports = class UserDTO {
    static mapper(user){
        return {
            nome:user.nome,
            telefone:user.telefone,
            email:user.email,
            nif:user.nif,
        }
    }
}