const {DataTypes, Model} = require("sequelize");

class Menu extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
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
        db.Menu.hasMany(db.Categoria);
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

module.exports = Menu;