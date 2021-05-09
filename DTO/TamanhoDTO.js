const GrupoDTO = require("./GrupoDTO")

module.exports = class TamanhoDTO {
    static mapper(data){

        return{
            id:data.get('id'),
            preco:data.get('preco'),
            nome:data.get('nome'),
            default:data.get('default'),
            grupos:data.get('OpcaoGrupoTamanho') ? data.get('OpcaoGrupoTamanho').map(GrupoDTO.mapper) : []
        }
    }
}