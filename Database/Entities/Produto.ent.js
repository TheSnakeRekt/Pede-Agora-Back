const {DataTypes, Model} = require("sequelize");
const con = require('../DatabaseCon.js');
const Menu = require("./Menu.ent.js");
const Restaurante = require("./Restaurante.ent.js");

class Produto extends Model {}

Produto.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
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
    tags:{
        type:DataTypes.STRING,
        get: function(){
            return JSON.parse(this.getDataValue('tags'))
        },
        set: function(val){
             this.setDataValue('tags', JSON.stringify(val))
        },
        defaultValue: []
    }
}, {sequelize: con, timestamps:true}).belongsTo(Restaurante).belongsToMany(Menu).sync()



module.exports = Produto;