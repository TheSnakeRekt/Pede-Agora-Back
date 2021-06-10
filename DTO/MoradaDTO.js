module.exports = class MoradaDTO {
    static mapper(moradaEntity){
        if(Array.isArray(moradaEntity)){
         
           return moradaEntity.map(moradaEntity=>{
                return {
                    type: moradaEntity.get().type?  moradaEntity.get().type :'home',
                    name: moradaEntity.get().name? moradaEntity.get().name :'Casa',
                    rua: moradaEntity.get().rua, 
                    codigoPostal: moradaEntity.get().codigoPostal,
                    cidade: moradaEntity.get().cidade,
                    distrito: moradaEntity.get().distrito ? moradaEntity.get().distrito: '',
                    pais: moradaEntity.get().pais ? moradaEntity.get().pais : 'PT',
                    latitude:moradaEntity.get().geo ?  moradaEntity.get().geo.lat : moradaEntity.get().latitude,
                    longitude:moradaEntity.get().geo ? moradaEntity.get().geo.lng : moradaEntity.get().longitude,
                    default:moradaEntity.get().default
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
            pais: moradaEntity.pais ? moradaEntity.pais : 'PT',
            latitude:moradaEntity.geo ?  moradaEntity.geo.lat : moradaEntity.latitude,
            longitude:moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude,
            default:moradaEntity.default
       }];
    }
}