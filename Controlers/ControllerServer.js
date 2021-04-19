const express = require('express');
const app = express();
const bodyParser = require('body-parser')

module.exports = class ControllerServer {

    static app;
    static serverOn = false;

    static async start() {
        return new Promise((res,rej)=>{
            if(!this.app && !this.serverOn){
                this.app = express();
                app.use((req, res, next)=>{
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                
                 
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,json');
                
                    res.setHeader('Access-Control-Allow-Credentials', true);
                
                    next();
                });
                
                app.use(bodyParser.json());

                app.listen(3000);
                this.serverOn = true;
                res(app);
            }
            rej('server on')
        })
    }
}