
module.exports = class Cliente_Morada {
    static define(con){
        return con.define('Clientes_Morada', {}, { timestamps: false });
    }
}
