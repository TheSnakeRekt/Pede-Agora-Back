const restaurantController = require('./Controlers/Restaurant.controler');
const loginController = require('./Controlers/Login.controller');

module.exports = class Server {
    static start(){
        restaurantController.restaurantRestAdapter();
        loginController.loginRestAdapter();
    }
}