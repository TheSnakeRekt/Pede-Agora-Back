const {DataTypes, Model, NOW} = require("sequelize");
const con = require('../DatabaseCon.js');
const Cliente = require("./Cliente.ent.js");
const Menu = require("./Menu.ent.js");
const Restaurante = require("./Restaurante.ent.js");

class Pedido extends Model {}
class PedidoDetalhes extends Pedido {}

Pedido.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    emCurso:DataTypes.BOOLEAN,
    pago:DataTypes.BOOLEAN,
    taxaDeEntrega:{
        type:DataTypes.DECIMAL(4, 2),
        defaultValue: 0.00
    },
    totalSIva:{
        type:DataTypes.DECIMAL(4, 2),
        defaultValue: 0.00
    },
    inicioDePedido:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    fimDePedido:DataTypes.DATE,
    hasPromoCode:DataTypes.BOOLEAN,
    promoCode:DataTypes.STRING,
},{sequelize: con,timestamps:true}).belongsTo(Cliente).belongsTo(Restaurante).hasMany(PedidoDetalhes).sync();

PedidoDetalhes.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    quantidade: DataTypes.INTEGER,
    valor:{
        type:DataTypes.DECIMAL(4, 2),
        defaultValue: 0.00
    }
},{sequelize: con,timestamps:true}).hasMany(Menu).belongsTo(Pedido).sync();

module.exports = Pedido;