module.exports = class ProdutoDTO {
    static mapper(data,cdn){
        return {
           id:data.get('id'),
           nome:data.get('nome'),
           foto:data.get('foto')?`${cdn}${data.get('foto')}`:'',
           descricao:data.get('descricao'),
           tags: data.get('tags'),
           preco: data.get('valorCIva')
        }
    }
}