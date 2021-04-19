const RestauranteService = require('../Business/Restaurant/Restaurante.service');
const ControllerServer = require('./ControllerServer');
class RestaurantController  {

    constructor(RestauranteService){
        this.restaurantService = RestauranteService;
    }

    restaurantRestAdapter(){
        ControllerServer.app().get('/restaurantes',async (req, res)=>{
            RestauranteService.findAll().then(data=>{
                res.send(data);
                res.end();
            })
        })
    }
}

module.exports = new RestaurantController(RestauranteService);