const {DataTypes, Model} = require("sequelize");
const Categoria_Produto = require("../Joins/Categoria2Produto.join");

class Produto extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            nome:DataTypes.STRING,
            foto:DataTypes.STRING,
            valorSIva:{
                type:DataTypes.DECIMAL(4, 2),
                defaultValue: 0.00
            },
            valorCIva:{
                type:DataTypes.DECIMAL(4, 2),
                defaultValue: 0.00
            },
            tags:DataTypes.STRING,
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Produto.belongsTo(db.Restaurante);
        db.Produto.belongsToMany(db.Menu, {through: Categoria_Produto.define(db.sequelize)});
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

module.exports = Produto;