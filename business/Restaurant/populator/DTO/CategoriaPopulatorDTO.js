module.exports = class CategoriaPopulatorDTO {
    static mapper(data,file){
        return{
            id:data.id,
            nome:data.name,
            descricao:data.description,
            foto:file
        }
    }
}