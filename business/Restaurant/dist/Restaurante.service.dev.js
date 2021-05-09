"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RestauranteDTO = require("../../DTO/RestauranteDTO");

var MenuDTO = require('../../DTO/MenuDTO');

var db = require('../../Database/Database');

var RestauranteService =
/*#__PURE__*/
function () {
  function RestauranteService(restauranteRepository, menuRepository) {
    _classCallCheck(this, RestauranteService);

    this.restauranteRepository = restauranteRepository;
    this.menuRepository = menuRepository;
  }

  _createClass(RestauranteService, [{
    key: "findAll",
    value: function findAll() {
      var restaurantes;
      return regeneratorRuntime.async(function findAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.restauranteRepository.sync();
              _context.next = 3;
              return regeneratorRuntime.awrap(this.restauranteRepository.findAll({
                include: db.Morada
              }));

            case 3:
              restaurantes = _context.sent;
              return _context.abrupt("return", restaurantes.map(RestauranteDTO.mapper));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      var restaurante;
      return regeneratorRuntime.async(function findOne$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.restauranteRepository.sync();
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.restauranteRepository.findOne({
                where: {
                  id: id
                },
                include: db.Morada
              }));

            case 3:
              restaurante = _context2.sent;
              return _context2.abrupt("return", RestauranteDTO.mapper(restaurante));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findOneWithMeals",
    value: function findOneWithMeals(id) {
      var rest, meals;
      return regeneratorRuntime.async(function findOneWithMeals$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.menuRepository.sync();
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.restauranteRepository.findOne({
                where: {
                  id: id
                },
                raw: true
              }));

            case 3:
              rest = _context3.sent;
              _context3.next = 6;
              return regeneratorRuntime.awrap(this.menuRepository.findOne({
                where: {
                  RestauranteId: id
                },
                include: {
                  model: db.Categoria,
                  required: true,
                  include: [{
                    model: db.Produto,
                    required: true,
                    include: {
                      model: db.Tamanho,
                      required: false,
                      include: {
                        model: db.GrupoTamanho,
                        required: false,
                        include: {
                          model: db.Opcao,
                          required: false
                        }
                      }
                    }
                  }, {
                    model: db.Grupo,
                    required: false,
                    include: {
                      model: db.Opcao,
                      required: false
                    }
                  }]
                }
              }));

            case 6:
              meals = _context3.sent;
              return _context3.abrupt("return", meals.get('Categoria').map(function (cat) {
                return MenuDTO.mapper(cat, rest.cdn);
              }));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addRestaurante",
    value: function addRestaurante(data) {
      return regeneratorRuntime.async(function addRestaurante$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.restauranteRepository.create());

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return RestauranteService;
}();

module.exports = new RestauranteService(db.Restaurante, db.Menu);