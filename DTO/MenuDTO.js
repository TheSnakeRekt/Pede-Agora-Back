const GrupoDTO = require("./GrupoDTO")
const ProdutoDTO = require("./ProdutoDTO")


module.exports = class MenuDTO {
    static mapper(data){

        return {
            id:data.get('id'),
            nome:data.get('nome'),
            active:data.get('active'),
            foto:data.get('foto'),
            grupos: data.get('Grupos')? data.get('Grupos').map(GrupoDTO.mapper):[],
            produtos:data.get('Produtos').map(ProdutoDTO.mapper)
        }
    }
}