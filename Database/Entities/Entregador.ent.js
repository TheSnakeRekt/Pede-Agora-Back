const {DataTypes, Model, NOW} = require("sequelize");
const con = require('../DatabaseCon.js');
const Morada = require("./Morada.ent.js");
const Pedido = require("./Pedido.ent.js");


class Entregador extends Model {}
class PosicaoEntregador extends Entregador {}

Entregador.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    pedidoAtual:DataTypes.INTEGER,
    nome:DataTypes.STRING,
    telefone:DataTypes.STRING,
    email:DataTypes.STRING,
    area:DataTypes.STRING,
}, {sequelize: con, timestamps:true}).hasOne(Morada).hasOne(PosicaoEntregador).hasMany(Pedido).sync()

PosicaoEntregador.init({
    latitude:DataTypes.STRING,
    longitude:DataTypes.STRING
}, {sequelize: con, timestamps:true}).belongsTo(Entregador).sync();


module.exports = Entregador;