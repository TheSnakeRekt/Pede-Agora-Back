module.exports = class OpcaoDTO {
    static mapper(data){
        return{
            id:data.get('id'),
            preco:data.get('preco'),
            nome:data.get('nome'),
            default:data.get('default'),
        }
    }
}