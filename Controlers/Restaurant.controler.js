const RestauranteService = require('../Business/Restaurant/Restaurante.service');
class RestaurantController {

    name = `Restaurant Endpoint`;

    constructor(RestauranteService){
        this.restaurantService = RestauranteService;
    }

    restaurantRestAdapter = (app) => {
        app.get('/restaurantes', async (req, res)=>{
           const data = await this.restaurantService.findAll();
           res.send(data);
           res.end()
        });

        app.get('/restaurantes/:restaurantId', async (req,res)=>{
            console.log(req.params.restaurantId);
            const data = await this.restaurantService.findOne(req.params.restaurantId);
            res.send(data);
            res.end();
        });

        app.get('/restaurantes/:restaurantId/meals', async (req,res)=>{
            const data = await this.restaurantService.findOneWithMeals(req.params.restaurantId);
            res.send(data);
            res.end();
        });
    }
}

module.exports = new RestaurantController(RestauranteService);