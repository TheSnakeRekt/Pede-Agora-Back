const GrupoDTO = require("./GrupoDTO")

module.exports = class TamanhoDTO {
    static mapper(data){
        console.log(data);
        return{
            id:data.get('id'),
            preco:data.get('preco'),
            nome:data.get('nome'),
            default:data.get('default'),
            grupos:data.get('grupos') ? data.get('grupos').map(GrupoDTO.mapper) : []
        }
    }
}