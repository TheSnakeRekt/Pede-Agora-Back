module.exports = class ZonaDTO {
    static mapper(zonaEntity){
        return zonaEntity.raios ? zonaEntity.raios.split(',').map(raio=> raio.trim()) : [];
    }
}