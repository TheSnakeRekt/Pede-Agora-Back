const Cliente = require('./Entities/Cliente.ent')
const { Entregador, PosicaoEntregador } = require('./Entities/Entregador.ent');
const Menu = require('./Entities/Menu.ent');
const Morada = require('./Entities/Morada.ent');
const { Pedido, PedidoDetalhes } = require('./Entities/Pedido.ent');
const Produto = require('./Entities/Produto.ent');
const Restaurante = require('./Entities/Restaurante.ent');
const Categoria = require('./Entities/Categorias.ent');

const con = require('./DatabaseCon');
const Conta = require('./Entities/Conta.ent');

const db = {};

db.sequelize = con;

db.Conta= Conta;
db.Cliente = Cliente;
db.Menu = Menu;
db.Categoria = Categoria;
db.Pedido = Pedido;
db.Entregador = Entregador;
db.Morada = Morada;
db.Produto = Produto;
db.Restaurante = Restaurante;
db.PosicaoEntregador = PosicaoEntregador;
db.PedidoDetalhes = PedidoDetalhes;

Conta.init(con);
Restaurante.init(con);
Cliente.init(con);
Morada.init(con);
Menu.init(con);
Categoria.init(con);
Pedido.init(con);
Entregador.init(con);
Produto.init(con);
PosicaoEntregador.init(con);
PedidoDetalhes.init(con);

Conta.associate(db);
Cliente.associate(db);
Morada.associate(db);
Menu.associate(db);
Categoria.associate(db);
Pedido.associate(db);
Entregador.associate(db);
Produto.associate(db);
Restaurante.associate(db);
PosicaoEntregador.associate(db);
PedidoDetalhes.associate(db);


db.sequelize.sync({ alter: true }).catch(err=>{
    console.error(err.sql);
});

module.exports = db;