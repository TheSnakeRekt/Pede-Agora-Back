
module.exports = class Categoria_Produto {
    static define(con){
        return con.define('Categoria_Produto', {}, { timestamps: false });
    }
}