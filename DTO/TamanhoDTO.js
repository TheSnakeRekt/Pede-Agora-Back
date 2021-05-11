const GrupoDTO = require("./GrupoDTO")

module.exports = class TamanhoDTO {
    static mapper(data){
        return{
            id:data.id,
            preco:data.preco,
            nome:data.nome,
            default:data.default,
            grupos:data.get('GrupoTamanhos') ? data.get('GrupoTamanhos').map(GrupoDTO.mapper) : []
        }
    }
}