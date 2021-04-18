const app = require('./Controlers/Restaurant.controler');


module.exports = class Server {
    static start(){
        return app;
    }
}