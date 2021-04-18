const {DataTypes, Model} = require("sequelize");
const Entregador_Morada = require("../Joins/Entregador2Morada.join");
class Entregador extends Model {
    static init(con) {
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER, 
                    autoIncrement: true,
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
        db.Entregador.belongsToMany(db.Morada,{through:Entregador_Morada.define(db.sequelize)});
        db.Entregador.belongsTo(db.Conta);
        db.Entregador.hasOne(db.PosicaoEntregador);
        db.Entregador.hasMany(db.Pedido);
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