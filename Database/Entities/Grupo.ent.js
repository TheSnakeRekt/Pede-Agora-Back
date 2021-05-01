const {DataTypes, Model} = require("sequelize");

class Grupo extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            force_max:DataTypes.INTEGER,
            force_min:DataTypes.INTEGER,
            required:{type:DataTypes.BOOLEAN, defaultValue:false},
            nome:DataTypes.STRING
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Grupo.belongsTo(db.Categoria);
        db.Grupo.hasMany(db.Opcao);
    }

    static async createOrUpdate(values){
        return await this
        .findOne({where:{id:values.id}})
        .then((obj) => {
            if(obj)
                return obj.update(values);
            return this.create(values);
        })
    }
}

module.exports = Grupo;