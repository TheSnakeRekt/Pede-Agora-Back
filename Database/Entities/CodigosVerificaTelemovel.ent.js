const {DataTypes, Model} = require("sequelize");

class CodigosVerificaTelemovel extends Model{
    static init(con) {
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER, 
                    autoIncrement: true,
                    primaryKey: true
                },
                req_id:DataTypes.STRING,
                telefone:{type:DataTypes.STRING, unique:true},
                expiry:DataTypes.DATE,
                validated:DataTypes.BOOLEAN
            },{sequelize: con, timestamps:true}
        )
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

module.exports = CodigosVerificaTelemovel;
