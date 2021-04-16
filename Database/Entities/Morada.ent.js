const {DataTypes, Model} = require("sequelize");
const Cliente_Morada = require("../Joins/Cliente2Morada.join");
const Entregador_Morada = require("../Joins/Entregador2Morada.join");

class Morada extends Model {
    static init(con){
        return super.init({    
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
        }, {sequelize:con, timestamps:true});
    }

    static associate(db){
        db.Morada.belongsTo(db.Restaurante);
        db.Morada.belongsToMany(db.Cliente, {through:Cliente_Morada.define(db.sequelize)});
        db.Morada.belongsToMany(db.Entregador, {through:Entregador_Morada.define(db.sequelize)});
    }
}

module.exports = Morada;