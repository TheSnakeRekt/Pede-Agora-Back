const {DataTypes, Model} = require("sequelize");
const con = require('../DatabaseCon.js');
const Produto = require("./Produto.ent.js");
const Restaurante = require("./Restaurante.ent.js");

class Menu extends Model {}

Menu.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: 'compositeIndex',
        primaryKey: true
    },
    valorCIva:{
        type:DataTypes.DECIMAL(4, 2),
        defaultValue: 0.00
    },
    valorSIva:{
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
}, {sequelize: con, timestamps:true}).belongsTo(Restaurante).hasMany(Produto).sync();

module.exports = Menu;