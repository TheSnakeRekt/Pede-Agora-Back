const GrupoPopulatorDTO = require("./GrupoPopulatorDTO")

module.exports = class TamanhoPopulatorDTO {
    static mapper(data){
        return{
            id:data.id,
            nome:data.name,
            preco:data.price,
            default:data.default
        }
    }
}