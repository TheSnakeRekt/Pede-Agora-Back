const { API_URL, REQUEST_BODY } = require("./RestaurantHook");
const axios = require("axios");
const restaurant_server = require("./restaurant_server.json");
const Restaurante = require("../../Database/Entities/Restaurante.ent");
const Morada = require("../../Database/Entities/Morada.ent");



const restaurantBuilder = (resp)=>{
    let morada = new Morada(-1, resp.restaurant.restaurantAccount.street, resp.restaurant.restaurantAccount.city, resp.restaurant.restaurantAccount.state_code, resp.restaurant.restaurantAccount.zipcode, resp.restaurant.restaurantAccount.country_code, resp.latitude,resp.longitude);
    return new Restaurante(resp.restaurant.uid, resp.restaurant.name,`${resp.restaurant.uid+resp.restaurant.name}`, morada.id, resp.restaurant.terms.phone, false);
}

(()=>{
    let request_body = new REQUEST_BODY(restaurant_server[0].uid);
    axios.post(API_URL,request_body).then(data=>{
        let resp = data.data;
      
        console.log(restaurantBuilder(resp));
        
    })
})();

