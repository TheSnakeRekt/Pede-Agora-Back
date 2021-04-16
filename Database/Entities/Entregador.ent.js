const {DataTypes, Model} = require("sequelize");

class Entregador extends Model {
    static init(con) {
        return super.init(
            {
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
            }, 
            {sequelize: con, timestamps:true}
        )
    }

    static associate(db) {
        db.Entregador.hasOne(db.Morada);
        db.Entregador.hasOne(db.PosicaoEntregador);
        db.Entregador.hasMany(db.Pedido);
    }
}

class PosicaoEntregador extends Model {
    static init(con){
        return super.init({
            latitude:DataTypes.STRING,
            longitude:DataTypes.STRING
        }, {sequelize: con, timestamps:true})
    }

    static associate(db) {
        db.PosicaoEntregador.belongsTo(db.Entregador);
    }
}


module.exports = {Entregador, PosicaoEntregador};