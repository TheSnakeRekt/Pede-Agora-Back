const { API_URL, REQUEST_BODY } = require("../RestaurantHook");
const db = require('../../../Database/Database');
const axios = require("axios");
const restaurant_server = require("../restaurant_server.json");
const MoradaDTO = require("../../../DTO/MoradaDTO");
const RestauranteDTO = require("../../../DTO/RestauranteDTO");


(()=>{
    restaurant_server.forEach(restaurante=>{
        let request_body = new REQUEST_BODY(restaurante.uid);
        console.log(request_body);
        axios.post(API_URL,request_body).then(async resp=>{
            let data = resp.data;
            
            try {
                const morada = await db.Morada.createOrUpdate(MoradaDTO.mapper(data.restaurant.restaurantAccount, 
                                                                                JSON.parse(data.restaurant.delivery_zones[0].shape_json)));
                const restaurant = await db.Restaurante.createOrUpdate(RestauranteDTO.mapper(data,restaurante.uid));
                restaurant.setMorada(morada);
    
            } catch (error) {
                console.log(error)
            }
        });
        
    }) 
    console.log("done")
})();

