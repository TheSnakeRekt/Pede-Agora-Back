const {DataTypes, Model} = require("sequelize");
const con = require('../DatabaseCon.js');
const Morada = require("./Morada.ent.js");
const Pedido = require("./Pedido.ent.js");


class Cliente extends Model{}

Cliente.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    nome:DataTypes.STRING,
    telefone:DataTypes.STRING,
    email:DataTypes.STRING,
    nif:DataTypes.STRING
},{sequelize: con, timestamps:true}).hasMany(Morada).hasMany(Pedido).sync();

module.exports = Cliente;
