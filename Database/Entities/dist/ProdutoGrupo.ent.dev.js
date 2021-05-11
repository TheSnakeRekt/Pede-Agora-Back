"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("sequelize"),
    DataTypes = _require.DataTypes,
    Model = _require.Model;

var Produto_Grupo = require("../Joins/Produto2Grupo.join");

var ProdutoGrupo =
/*#__PURE__*/
function (_Model) {
  _inherits(ProdutoGrupo, _Model);

  function ProdutoGrupo() {
    _classCallCheck(this, ProdutoGrupo);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProdutoGrupo).apply(this, arguments));
  }

  _createClass(ProdutoGrupo, null, [{
    key: "init",
    value: function init(con) {
      return _get(_getPrototypeOf(ProdutoGrupo), "init", this).call(this, {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        force_max: DataTypes.INTEGER,
        force_min: DataTypes.INTEGER,
        required: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        nome: DataTypes.STRING
      }, {
        sequelize: con,
        timestamps: true
      });
    }
  }, {
    key: "associate",
    value: function associate(db) {
      db.ProdutoGrupo.hasMany(db.OpcaoGrupoProduto);
      db.ProdutoGrupo.belongsToMany(db.Produto, {
        through: Produto_Grupo.define(db.sequelize)
      });
    }
  }, {
    key: "createOrUpdate",
    value: function createOrUpdate(values) {
      var _this = this;

      return regeneratorRuntime.async(function createOrUpdate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  id: values.id
                }
              }).then(function (obj) {
                if (obj) return obj.update(values);
                return _this.create(values);
              }));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ProdutoGrupo;
}(Model);

module.exports = ProdutoGrupo;