module.exports = class MoradaDTO {
    static mapper(moradaEntity){
       return{
            rua: moradaEntity.rua, 
            codigoPostal: moradaEntity.codigoPostal,
            cidade: moradaEntity.cidade,
            pais: moradaEntity.pais,
            geo:{
                lat:moradaEntity.latitude,
                lng:moradaEntity.longitude,
            }
       };
    }
}