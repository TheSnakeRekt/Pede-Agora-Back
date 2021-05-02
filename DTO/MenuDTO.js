const GrupoDTO = require("./GrupoDTO")
const ProdutoDTO = require("./ProdutoDTO")


module.exports = class MenuDTO {
    static mapper(data,cdn){
        return {
            id:data.get('id'),
            nome:data.get('nome'),
            active:data.get('active'),
            foto:data.get('foto')?`${cdn}${data.get('foto')}`:'',
            grupos: data.get('Grupos')? data.get('Grupos').map(GrupoDTO.mapper):[],
            produtos:data.get('Produtos').map(prod=>{return ProdutoDTO.mapper(prod,cdn)})
        }
    }
}