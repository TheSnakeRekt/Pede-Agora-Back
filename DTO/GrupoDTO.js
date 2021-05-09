const OpcaoDTO = require("./OpcaoDTO")


module.exports = class GrupoDTO {
    static mapper(data){
        return{
            id:data.get('id'),
            required:data.get('required'),
            force_max:data.get('force_max'),
            force_min:data.get('force_min'),
            nome:data.get('nome'),
            opcoes:data.get('Opcaos') ? data.get('Opcaos') .map(OpcaoDTO.mapper)   : []
        }
    }
}