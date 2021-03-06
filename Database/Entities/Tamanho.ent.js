const {DataTypes, Model} = require("sequelize");
const Tamanho_Grupo = require("../Joins/Tamanho2Grupo.join");

class Tamanho extends Model{
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            preco:{
                type:DataTypes.DECIMAL(4, 2),
                defaultValue: 0.00
            },
            default:{type:DataTypes.BOOLEAN, defaultValue:false},
            nome:DataTypes.STRING
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Tamanho.belongsTo(db.Produto);
        db.Tamanho.belongsToMany(db.GrupoTamanho,{through:Tamanho_Grupo.define(db.sequelize)});
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

module.exports = Tamanho;