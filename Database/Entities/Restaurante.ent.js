

const {DataTypes, Model} = require("sequelize");
const con = require('../DatabaseCon');
const Menu = require("./Menu.ent");
const Morada = require('./Morada.ent');
const Pedido = require("./Pedido.ent");

class Restaurante extends Model {}

Restaurante.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    nome:DataTypes.String,
    telefone:DataTypes.STRING,
    promo:{type:DataTypes.BOOLEAN, defaultValue:false}
}, {sequelize: con, timestamps:true}).hasOne(Morada).hasMany(Menu).hasMany(Pedido).sync();


module.exports = Restaurante;