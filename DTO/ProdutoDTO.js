const GrupoDTO = require("./GrupoDTO")
const TamanhoDTO = require("./TamanhoDTO")

module.exports = class ProdutoDTO {
    static mapper(data, cdn){
        return {
           id:data.get('id'),
           nome:data.get('nome'),
           foto:data.get('foto')?`${cdn}${data.get('foto')}`:'',
           descricao:data.get('descricao'),
           tags: data.get('tags'),
           preco: data.get('valorCIva'),
           grupos: data.get('GrupoProdutos') ? data.get('GrupoProdutos').map(GrupoDTO.mapper) : [],
           tamanhos: data.get('Tamanhos') ? data.get('Tamanhos').map(TamanhoDTO.mapper) : []
        }
    }
}