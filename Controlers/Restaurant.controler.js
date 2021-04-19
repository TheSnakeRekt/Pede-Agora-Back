const RestauranteService = require('../Business/Restaurant/Restaurante.service');
class RestaurantController {

    name = `Restaurant Endpoint`;

    constructor(RestauranteService){
        this.restaurantService = RestauranteService;
    }

    restaurantRestAdapter = (app) => {
        app.get('/restaurantes', (req, res)=>{
            this.restaurantService.findAll().then(data=>{
                res.send(data);
                res.end();
            })
        })
    }
}

module.exports = new RestaurantController(RestauranteService);