const {DataTypes, Model} = require("sequelize");

class Restaurante extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                unique: 'compositeIndex',
                primaryKey: true
            },
            nome:DataTypes.STRING,
            telefone:DataTypes.STRING,
            promo:{type:DataTypes.BOOLEAN, defaultValue:false}
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Restaurante.hasOne(db.Morada);
        db.Restaurante.hasMany(db.Pedido);
        db.Restaurante.hasMany(db.Menu);
    }
}

module.exports = Restaurante;