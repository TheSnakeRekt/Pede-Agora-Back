const {DataTypes, Model} = require("sequelize");
const Produto_Menu = require("../Joins/Produto2Menu.join");

class Produto extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                unique: 'compositeIndex',
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
            tags:{
                type:DataTypes.STRING,
                get: function(){
                    return JSON.parse(this.getDataValue('tags'))
                },
                set: function(val){
                     this.setDataValue('tags', JSON.stringify(val))
                }
            }
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Produto.belongsTo(db.Restaurante);
        db.Produto.belongsToMany(db.Menu, {through: Produto_Menu.define(db.sequelize)});
    }
}

module.exports = Produto;