const ControllerServer = require('./Controlers/ControllerServer');
const restaurantController = require('./Controlers/Restaurant.controler');
const loginController = require('./Controlers/Login.controller');
const checkoutController = require('./Controlers/Checkout.controler');

class Server {
    static app;

    constructor(restaurantController, loginController, checkoutController){
        this.restaurantController = restaurantController;
        this.loginController = loginController;
        this.checkoutController = checkoutController;
    }

    async start() {
        this.app = await ControllerServer.start();
        console.log("Server is on: ", ControllerServer.serverOn);
        
        this.restaurantController.restaurantRestAdapter(this.app);
        this.loginController.loginRestAdapter(this.app);
        this.checkoutController.checkoutRestAdapter(this.app);

        console.log("Endpoints", [this.restaurantController.name, this.loginController.name, this.checkoutController.name]);
    }
}

module.exports = new Server(restaurantController, loginController, checkoutController);