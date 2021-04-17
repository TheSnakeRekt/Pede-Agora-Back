const {DataTypes, Model} = require("sequelize");

class Categoria extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            nome:DataTypes.STRING,
            descricao:DataTypes.STRING,
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Categoria.belongsTo(db.Menu);
        db.Categoria.hasMany(db.Produto);
       // db.Categoria.hasMany(db.Grupos);
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

module.exports = Categoria;