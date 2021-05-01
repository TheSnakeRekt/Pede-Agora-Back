const {DataTypes, Model} = require("sequelize");

class Restaurante extends Model {
    static init(con){
        return super.init({
            id:{
                type:DataTypes.INTEGER, 
                autoIncrement: true,
                primaryKey: true
            },
            nome:DataTypes.STRING,
            telefone:DataTypes.STRING,
            uid:DataTypes.STRING,
            tags:DataTypes.STRING,
            logo:DataTypes.STRING,
            desktop_widget:DataTypes.STRING,
            cdn:DataTypes.STRING,
            cotacao:DataTypes.DECIMAL(2,1),
            totalReviews:DataTypes.INTEGER,
            timing:{type:DataTypes.STRING, defaultValue:'30-40min'},
            promo:{type:DataTypes.BOOLEAN, defaultValue:false}
        }, {sequelize: con, timestamps:true});
    }

    static associate(db){
        db.Restaurante.belongsTo(db.Morada);
        db.Restaurante.belongsTo(db.Conta);
        db.Restaurante.hasMany(db.Pedido);
        db.Restaurante.hasMany(db.Menu);
    }

    static async createOrUpdate(values){
        return await this
        .findOne({where:{uid:values.uid}})
        .then((obj) => {
            if(obj)
                return obj.update(values);
            return this.create(values);
        })
    }
}

module.exports = Restaurante;