const {DataTypes, Model} = require("sequelize");

class Menu extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                unique: 'compositeIndex',
                primaryKey: true
            },
            valorCIva:{
                type:DataTypes.DECIMAL(4, 2),
                defaultValue: 0.00
            },
            valorSIva:{
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
        db.Menu.belongsTo(db.Restaurante);
        db.Menu.hasMany(db.Produto);
    }
}

module.exports = Menu;