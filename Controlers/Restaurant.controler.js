const express = require('express');
const RestauranteService = require('../Business/Restaurant/Restaurante.service');
const app = express();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/restaurantes',async (req, res)=>{
    RestauranteService.findAll().then(data=>{
        res.send(data);
        res.end();
    })
});

app.listen(3000);

module.exports = app;