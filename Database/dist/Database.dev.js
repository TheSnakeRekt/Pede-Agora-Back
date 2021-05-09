"use strict";

var Cliente = require('./Entities/Cliente.ent');

var _require = require('./Entities/Entregador.ent'),
    Entregador = _require.Entregador,
    PosicaoEntregador = _require.PosicaoEntregador;

var Menu = require('./Entities/Menu.ent');

var Morada = require('./Entities/Morada.ent');

var _require2 = require('./Entities/Pedido.ent'),
    Pedido = _require2.Pedido,
    PedidoDetalhes = _require2.PedidoDetalhes;

var Produto = require('./Entities/Produto.ent');

var Restaurante = require('./Entities/Restaurante.ent');

var Categoria = require('./Entities/Categoria.ent');

var Grupo = require('./Entities/Grupo.ent');

var con = require('./DatabaseCon');

var Conta = require('./Entities/Conta.ent');

var Opcao = require('./Entities/Opcao.ent');

var Tamanho = require('./Entities/Tamanho.ent');

var GrupoTamanho = require('./Entities/GrupoTamanho.ent');

var db = {};
db.sequelize = con;
db.Conta = Conta;
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
db.Grupo = Grupo;
db.Opcao = Opcao;
db.Tamanho = Tamanho;
db.GrupoTamanho = GrupoTamanho;
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
Grupo.init(con);
Opcao.init(con);
Tamanho.init(con);
GrupoTamanho.init(con);
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
Grupo.associate(db);
Opcao.associate(db);
Tamanho.associate(db);
GrupoTamanho.associate(db);
db.sequelize.sync({
  alter: true
})["catch"](function (err) {
  console.error(err.sql);
});
module.exports = db;