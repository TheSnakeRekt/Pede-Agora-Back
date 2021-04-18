const RestauranteDTO = require("../../DTO/RestauranteDTO");
const db = require('../../Database/Database');

class RestauranteService {
    constructor(restauranteRepository){
        this.restauranteRepository = restauranteRepository;
    }

    async findAll(){
        this.restauranteRepository.sync();
        const restaurantes = await this.restauranteRepository.findAll({include:db.Morada});
     
        return restaurantes.map(RestauranteDTO.mapper);
    }

    async addRestaurante(data){
        return await this.restauranteRepository.create();
    }
}

module.exports = new RestauranteService(db.Restaurante);