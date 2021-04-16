const {DataTypes, Model} = require("sequelize");

class Pedido extends Model {
    
    static init(con) {
        return super.init({
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
        },{sequelize: con,timestamps:true});
    }

    static associate(db) {
        db.Pedido.belongsTo(db.Cliente);
        db.Pedido.belongsTo(db.Restaurante);
        db.Pedido.hasMany(db.PedidoDetalhes);
    }
}

class PedidoDetalhes extends Model {
    static init(con){
        return super.init({
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
        },{sequelize: con,timestamps:true});
    }

    static associate(db){
        db.PedidoDetalhes.hasMany(db.Menu);
        db.PedidoDetalhes.belongsTo(db.Pedido);
    }
}

module.exports = {Pedido, PedidoDetalhes};