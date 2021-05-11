const {DataTypes, Model} = require("sequelize");
const Categoria_Produto = require("../Joins/Categoria2Produto.join");
const Produto_Grupo = require("../Joins/Produto2Grupo.join");

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
            descricao:DataTypes.TEXT,
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Produto.belongsTo(db.Restaurante);

        db.Produto.hasMany(db.Tamanho);
        db.Produto.belongsToMany(db.GrupoProduto, {through:Produto_Grupo.define(db.sequelize)});

        db.Produto.belongsToMany(db.Categoria, {through: Categoria_Produto.define(db.sequelize)});
    }

    static async createOrUpdate(values){
        return await this
        .findOne({ where: {id:values.id} })
        .then((obj) => {
            if(obj)
                return obj.update(values);
            return this.create(values);
        })
    }
}

module.exports = Produto;