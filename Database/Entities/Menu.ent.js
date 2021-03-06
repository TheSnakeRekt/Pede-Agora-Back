const {DataTypes, Model} = require("sequelize");

class Menu extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            uid:DataTypes.STRING,
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