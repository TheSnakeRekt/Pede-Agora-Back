const {DataTypes, Model} = require("sequelize");

class Pedido extends Model {
    
    static init(con) {
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
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
            infoExtra:DataTypes.TEXT,
            fimDePedido:DataTypes.DATE,
            hasPromoCode:DataTypes.BOOLEAN,
            promoCode:DataTypes.STRING,
        },{sequelize: con,timestamps:true});
    }

    static associate(db) {
        db.Pedido.belongsTo(db.Cliente);
        db.Pedido.belongsTo(db.Restaurante);
        db.Pedido.belongsTo(db.PedidoDetalhes);
    }
    
    static async createOrUpdate(values){
        return await this
        .findOne({ where: values })
        .then((obj) => {
            if(obj)
                return obj.update(values);
            return this.create(values);
        })
    }
}

class PedidoDetalhes extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
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
        db.PedidoDetalhes.hasMany(db.Pedido);
    }
}

module.exports = {Pedido, PedidoDetalhes};