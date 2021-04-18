const {DataTypes, Model} = require("sequelize");
const Cliente_Morada = require("../Joins/Cliente2Morada.join");

class Cliente extends Model{
    static init(con) {
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER, 
                    autoIncrement: true,
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
        db.Cliente.belongsToMany(db.Morada,{through:Cliente_Morada.define(db.sequelize)});
        db.Cliente.hasMany(db.Pedido);
        db.Cliente.belongsTo(db.Conta);
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

module.exports = Cliente;
