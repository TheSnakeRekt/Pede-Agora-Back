const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const JWT_SECRET = `0nHsn1*HrfFHa@hkC5pe20HHE5xTwh#P4u!%YWt%M#nhjpHxT5`;
module.exports = class ControllerServer {

    static app;
    static serverOn = false;

    static async start() {
        return new Promise((res,rej)=>{
            if(!this.app && !this.serverOn){
                this.app = express();
                this.app.set('secret', JWT_SECRET);
                
                app.use((req, res, next)=>{
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    
                 
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, json, x-access-token');
                
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