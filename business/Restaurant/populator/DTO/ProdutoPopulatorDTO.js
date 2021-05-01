module.exports = class ProdutoPopulatorDTO {
    static mapper(data, foto){
        return{
            id:data.id,
            nome:data.name,
            descricao:data.description,
            valorCIva:data.price,
            valorSIva:data.price,
            tags:JSON.stringify(data.tags),
            foto:foto ? foto:''
        }
    }
}