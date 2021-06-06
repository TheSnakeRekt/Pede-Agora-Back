const {DataTypes, Model} = require("sequelize");

class Conta extends Model{
    static init(con){
        return super.init({
            id:{
                type: DataTypes.UUID,
                primaryKey:true,
                defaultValue: DataTypes.UUIDV4
            },
            access:DataTypes.STRING,
            password:DataTypes.STRING,
            verified:{type:DataTypes.BOOLEAN,defaultValue:false},
            verifiedMail:{type:DataTypes.BOOLEAN,defaultValue:false},
            verifyCode:DataTypes.STRING
        }, {sequelize: con, timestamps:true})
    }

    static associate(db){
        db.Conta.hasOne(db.Cliente);
        db.Conta.hasOne(db.Entregador);
        db.Conta.hasOne(db.Restaurante);
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

module.exports = Conta;