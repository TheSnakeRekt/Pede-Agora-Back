const {DataTypes, Model} = require("sequelize");

class Cliente extends Model{
    static init(con) {
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER, 
                    unique: 'compositeIndex',
                    primaryKey: true
                },
                nome:DataTypes.STRING,
                telefone:DataTypes.STRING,
                email:DataTypes.STRING,
                nif:DataTypes.STRING
            },{sequelize: con, timestamps:true}
        )
    }

    static associate(db) {
        db.Cliente.hasMany(db.Morada);
        db.Cliente.hasMany(db.Pedido);
    }
}

module.exports = Cliente;
