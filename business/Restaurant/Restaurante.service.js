const RestauranteDTO = require("../../DTO/RestauranteDTO");
const db = require('../../Database/Database');
const Morada = require("../../Database/Entities/Morada.ent");

class RestauranteService {
    constructor(restauranteRepository){
        this.restauranteRepository = restauranteRepository;
    }

    async findAll(){
        this.restauranteRepository.sync();
        const restaurantes = await this.restauranteRepository.findAll({include:Morada});
     
        return restaurantes.map(RestauranteDTO.mapper);
    }

    async addRestaurante(data){
        return await this.restauranteRepository.create();
    }
}

module.exports = new RestauranteService(db.Restaurante);