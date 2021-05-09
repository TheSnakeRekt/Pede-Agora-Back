const Cliente = require('./Entities/Cliente.ent')
const { Entregador, PosicaoEntregador } = require('./Entities/Entregador.ent');
const Menu = require('./Entities/Menu.ent');
const Morada = require('./Entities/Morada.ent');
const { Pedido, PedidoDetalhes } = require('./Entities/Pedido.ent');
const Produto = require('./Entities/Produto.ent');
const Restaurante = require('./Entities/Restaurante.ent');
const Categoria = require('./Entities/Categoria.ent');
const Grupo = require('./Entities/Grupo.ent');

const con = require('./DatabaseCon');
const Conta = require('./Entities/Conta.ent');
const Opcao = require('./Entities/Opcao.ent');
const Tamanho = require('./Entities/Tamanho.ent');
const GrupoTamanho = require('./Entities/GrupoTamanho.ent');
const OpcaoGrupoTamanho = require('./Entities/OpcaoGrupoTamanho.ent');

const db = {};

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
db.OpcaoGrupoTamanho = OpcaoGrupoTamanho;


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
OpcaoGrupoTamanho.init(con);

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
OpcaoGrupoTamanho.associate(db);

db.sequelize.sync({ alter: true }).catch(err=>{
    console.error(err.sql);
});

module.exports = db;