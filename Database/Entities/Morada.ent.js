const {DataTypes, Model} = require("sequelize");


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
        }, {sequelize:con, timestamps:true});
    }

    static associate(db){
        db.Morada.hasOne(db.Restaurante);
        db.Morada.hasMany(db.Cliente);
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