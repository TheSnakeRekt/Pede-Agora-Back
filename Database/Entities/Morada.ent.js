const {DataTypes, Model} = require("sequelize");
const con = require('../DatabaseCon.js');
const Restaurante = require("./Restaurante.ent.js");

class Morada extends Model {}

Morada.init({    
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    rua:DataTypes.STRING,
    cidade:DataTypes.STRING,
    distrito:DataTypes.STRING,
    codigoPostal:DataTypes.STRING,
    pais:DataTypes.STRING,
    latitude:DataTypes.STRING,
    longitude:DataTypes.STRING,
}, {sequelize:con, timestamps:true}).belongsTo(Restaurante).belongsToMany(Cliente).belongsToMany(Entregador).sync();

module.exports = Morada;