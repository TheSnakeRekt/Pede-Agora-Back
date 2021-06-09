const {DataTypes, Model} = require("sequelize");
const Restaurante_Zona = require("../Joins/Restaurante2ZonaEntrega.join");

class ZonaEntrega extends Model{
    static init(con){
        return super.init({
            id:{
                type: DataTypes.UUID,
                primaryKey:true,
                defaultValue: DataTypes.UUIDV4
            },
            raios:DataTypes.TEXT,
            precos:DataTypes.STRING
        }, {sequelize: con, timestamps:true})
    }

    static associate(db){
        db.ZonaEntrega.belongsToMany(db.Restaurante, {through:Restaurante_Zona.define(db.sequelize)});
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

module.exports = ZonaEntrega;