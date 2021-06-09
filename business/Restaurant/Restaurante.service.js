const RestauranteDTO = require("../../DTO/RestauranteDTO");
const MenuDTO = require('../../DTO/MenuDTO');

const db = require('../../Database/Database');

class RestauranteService {
    constructor(restauranteRepository, menuRepository, grupoTamanho){
        this.restauranteRepository = restauranteRepository;
        this.menuRepository = menuRepository;
        this.grupoTamanhoRepository = grupoTamanho;
    }

    async findAll(){
        this.restauranteRepository.sync();
        const restaurantes = await this.restauranteRepository.findAll({include:[
            {model:db.Morada},
            {model:db.ZonaEntrega}
        ]});
        
        return restaurantes.map(RestauranteDTO.mapper);
    }

    async findOne(id){
        this.restauranteRepository.sync();
        const restaurante = await this.restauranteRepository.findOne({where:{id:id}, include:[
            {model:db.Morada},
            {model:db.ZonaEntrega}
        ]});
        
        return RestauranteDTO.mapper(restaurante);
    }

    async findOneWithMeals(id){
        this.menuRepository.sync();
        const rest = await this.restauranteRepository.findOne({where:{id:id},raw:true});

        const meals = await this.menuRepository.findOne({where:{RestauranteId:id}, 
            include:{
                model:db.Categoria,
                required:true,
                include:[{
                    model:db.Produto,
                    required:true,
                    separate:true,
                    include:[{
                        model:db.Tamanho,
                        required:false,
                        include:{
                            model:db.GrupoTamanho,
                            required:false,
                            include:{
                                model:db.OpcaoGrupoTamanho,
                                as:'Opcoes',
                                required:false
                            }
                        }
                    },{
                        model:db.GrupoProduto,
                        required:false,
                       
                        include:{
                            model:db.OpcaoGrupoProduto,
                            as:'Opcoes',
                            required:false,
                        }
                    }]
                },{
                    model:db.Grupo,
                    required:false,
                    include:{
                        model:db.Opcao,
                        as:'Opcoes',
                        required:false
                    }
                }]
            }
        });

    

        return meals.get('Categoria').map(cat=>MenuDTO.mapper(cat, rest.cdn));
    }

    async addRestaurante(data){
        return await this.restauranteRepository.create();
    }
}

module.exports = new RestauranteService(db.Restaurante, db.Menu, db.GrupoTamanho);