const {DataTypes, Model} = require("sequelize");

class Opcao extends Model{
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
        db.Opcao.belongsTo(db.Grupo);
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

module.exports = Opcao;