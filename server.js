const ControllerServer = require('./Controlers/ControllerServer');
const restaurantController = require('./Controlers/Restaurant.controler');
const loginController = require('./Controlers/Login.controller');

class Server {
    static app;

    constructor(restaurantController, loginController){
        this.restaurantController = restaurantController;
        this.loginController = loginController;
    }

    async start() {
        this.app = await ControllerServer.start();
        console.log("Server is on: ", ControllerServer.serverOn);
        
        this.restaurantController.restaurantRestAdapter(this.app);
        this.loginController.loginRestAdapter(this.app);


        console.log("Endpoints", [this.restaurantController.name, this.loginController.name]);
    }
}

module.exports = new Server(restaurantController,loginController);