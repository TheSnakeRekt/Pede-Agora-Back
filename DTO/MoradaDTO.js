module.exports = class MoradaDTO {
    static mapper(moradaEntity){
        if(Array.isArray(moradaEntity)){
            moradaEntity.map(moradaEntity=>{
                return {
                    type: moradaEntity.type?  moradaEntity.type :'home',
                    name: moradaEntity.name? moradaEntity.name :'Casa',
                    rua: moradaEntity.rua, 
                    codigoPostal: moradaEntity.codigoPostal,
                    cidade: moradaEntity.cidade,
                    distrito: moradaEntity.distrito ? moradaEntity.distrito: '',
                    pais: moradaEntity.pais,
                    latitude:moradaEntity.geo ?  moradaEntity.geo.lat : moradaEntity.latitude,
                    longitude:moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude
               };
            });
        }
        return [{
            type: moradaEntity.type?  moradaEntity.type :'home',
            name: moradaEntity.name? moradaEntity.name :'Casa',
            rua: moradaEntity.rua, 
            codigoPostal: moradaEntity.codigoPostal,
            cidade: moradaEntity.cidade,
            distrito: moradaEntity.distrito ? moradaEntity.distrito: '',
            pais: moradaEntity.pais,
            latitude:moradaEntity.geo ?  moradaEntity.geo.lat : moradaEntity.latitude,
            longitude:moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude
       }];
    }
}