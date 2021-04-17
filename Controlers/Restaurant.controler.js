const express = require('express');
const db = require('../Database/Database');
const app = express();



app.get('/restaurantes',async (req, res)=>{
    db.Restaurante.findAll({ include:
        [{ model: db.Morada }] }).then(data=>{
        res.send(data);
    })
});

app.listen(3000)