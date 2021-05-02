const RestauranteDTO = require("../../DTO/RestauranteDTO");
const MenuDTO = require('../../DTO/MenuDTO');

const db = require('../../Database/Database');

class RestauranteService {
    constructor(restauranteRepository, menuRepository){
        this.restauranteRepository = restauranteRepository;
        this.menuRepository = menuRepository;
    }

    async findAll(){
        this.restauranteRepository.sync();
        const restaurantes = await this.restauranteRepository.findAll({include:db.Morada});
        
        return restaurantes.map(RestauranteDTO.mapper);
    }

    async findOne(id){
        this.menuRepository.sync();
        const meals = await this.menuRepository.findOne({where:{RestauranteId:id}, 
            include:{
                model:db.Categoria,
                required:true,
                include:[{
                    model:db.Produto,
                    required:true
                },{
                    model:db.Grupo,
                    required:false,
                    include:{
                        model:db.Opcao,
                        required:true
                    }
                }]
            }
        });

        return meals.get('Categoria').map(MenuDTO.mapper);
    }

    async addRestaurante(data){
        return await this.restauranteRepository.create();
    }
}

module.exports = new RestauranteService(db.Restaurante, db.Menu);