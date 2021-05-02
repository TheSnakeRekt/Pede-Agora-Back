module.exports = class ProdutoDTO {
    static mapper(data){
        return {
           id:data.get('id'),
           nome:data.get('nome'),
           foto:data.get('foto'),
           descricao:data.get('descricao'),
           tags: data.get('tags'),
           preco: data.get('valorCIva')
        }
    }
}