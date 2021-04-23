const MoradaDTO = require("./MoradaDTO");
module.exports = class UserDTO {
    static mapper(user){
        return {
            nome:user.nome,
            telefone:user.telefone,
            email:user.email,
            nif:user.nif,
            morada:user.Moradas ? MoradaDTO.mapper(user.Moradas) : '',
            token:user.token ? user.token : ``
        }
    }
}