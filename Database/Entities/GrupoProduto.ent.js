const {DataTypes, Model} = require("sequelize");
const Produto_Grupo = require("../Joins/Produto2Grupo.join");

class GrupoProduto extends Model {
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
        db.GrupoProduto.hasMany(db.OpcaoGrupoProduto,{as:'Opcoes'});
        db.GrupoProduto.belongsToMany(db.Produto, {through:Produto_Grupo.define(db.sequelize)});
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

module.exports = GrupoProduto;