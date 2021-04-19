const express = require('express');
const app = express();

module.exports = class ControlerServer {
    static app(){
        if(!app.get('port')){
            app.use((req, res, next)=>{
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            
             
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            
                res.setHeader('Access-Control-Allow-Credentials', true);
            
                next();
            });
    
            app.listen(3000);
        }
        return app;
    }
}