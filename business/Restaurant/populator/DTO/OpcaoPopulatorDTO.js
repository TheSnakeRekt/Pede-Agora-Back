module.exports = class OpcaoPopulatorDTO {
    static mapper(data){
        return{
            id:data.id,
            nome:data.name,
            preco:data.price,
            default:data.default
        }
    }
}