const Cliente = require('./Database/Entities/Cliente.ent');
const { Entregador, PosicaoEntregador } = require('./Database/Entities/Entregador.ent');
const Menu = require('./Database/Entities/Menu.ent');
const Morada = require('./Database/Entities/Morada.ent');
const { Pedido, PedidoDetalhes } = require('./Database/Entities/Pedido.ent');
const Produto = require('./Database/Entities/Produto.ent');
const Restaurante = require('./Database/Entities/Restaurante.ent');

const con = require('./Database/DatabaseCon');
const db = {};

db.sequelize = con;

db.Cliente = Cliente;
db.Menu = Menu;
db.Pedido = Pedido;
db.Entregador = Entregador;
db.Morada = Morada;
db.Produto = Produto;
db.Restaurante = Restaurante;
db.PosicaoEntregador = PosicaoEntregador;
db.PedidoDetalhes = PedidoDetalhes;

Cliente.init(con);
Morada.init(con);
Menu.init(con);
Pedido.init(con);
Entregador.init(con);
Produto.init(con);
Restaurante.init(con);
PosicaoEntregador.init(con);
PedidoDetalhes.init(con);

Cliente.associate(db);
Morada.associate(db);
Menu.associate(db);
Pedido.associate(db);
Entregador.associate(db);
Produto.associate(db);
Restaurante.associate(db);
PosicaoEntregador.associate(db);
PedidoDetalhes.associate(db);


console.log(db.sequelize.sync().catch(err=>{
    console.error(err.sql)
}));
module.exports = db;