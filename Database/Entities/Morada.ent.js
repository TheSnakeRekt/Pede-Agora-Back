const {DataTypes, Model} = require("sequelize");
const Cliente_Morada = require("../Joins/Cliente2Morada.join");


class Morada extends Model {
    static init(con){
        return super.init({    
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            rua:DataTypes.STRING,
            cidade:DataTypes.STRING,
            distrito:DataTypes.STRING,
            codigoPostal:DataTypes.STRING,
            pais:DataTypes.STRING,
            latitude:DataTypes.STRING,
            longitude:DataTypes.STRING,
            name:DataTypes.STRING,
            type:DataTypes.STRING,
            isRestaurant:{
                type:DataTypes.BOOLEAN,
                defaultValue:false
            }
        }, {sequelize:con, timestamps:true});
    }

    static associate(db){
        db.Morada.hasOne(db.Restaurante);
        db.Morada.belongsToMany(db.Cliente,{through:Cliente_Morada.define(db.sequelize)});
        db.Morada.hasMany(db.Entregador);
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

module.exports = Morada;