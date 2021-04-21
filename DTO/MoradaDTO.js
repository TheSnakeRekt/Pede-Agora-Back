module.exports = class MoradaDTO {
    static mapper(moradaEntity){
       return{
            rua: moradaEntity.rua, 
            codigoPostal: moradaEntity.codigoPostal,
            cidade: moradaEntity.cidade,
            distrito: moradaEntity.distrito ? moradaEntity.distrito: '',
            pais: moradaEntity.pais,
            latitude:moradaEntity.geo ?  moradaEntity.geo.lat : moradaEntity.latitude,
            longitude:moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude
       };
    }
}