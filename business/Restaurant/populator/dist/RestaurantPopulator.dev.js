"use strict";

var _require = require("./RestaurantHook"),
    API_URL = _require.API_URL,
    REQUEST_BODY = _require.REQUEST_BODY;

var db = require('../../../Database/Database');

var axios = require("axios");

var restaurant_server = require("./restaurant_server.json");

var MoradaPopulatorDTO = require("./DTO/MoradaPopulatorDTO");

var RestaurantePopulatorDTO = require("./DTO/RestaurantePopulatorDTO");

var CategoriaPopulatorDTO = require("./DTO/CategoriaPopulatorDTO");

var ProdutoPopulatorDTO = require("./DTO/ProdutoPopulatorDTO");

var GrupoPopulatorDTO = require("./DTO/GrupoPopulatorDTO");

var OpcaoPopulatorDTO = require("./DTO/OpcaoPopulatorDTO");

var MenuPopulatorDTO = require("./DTO/MenuPopulatorDTO");

(function () {
  restaurant_server.forEach(function (restaurante) {
    var request_body = new REQUEST_BODY(restaurante.uid);
    axios.post(API_URL, request_body).then(function _callee5(resp) {
      var data, morada, restaurant, menuInstance, fotos;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = resp.data;
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(db.Morada.createOrUpdate(MoradaPopulatorDTO.mapper(data.restaurant.restaurantAccount, JSON.parse(data.restaurant.delivery_zones[0].shape_json))));

            case 4:
              morada = _context5.sent;
              _context5.next = 7;
              return regeneratorRuntime.awrap(db.Restaurante.createOrUpdate(RestaurantePopulatorDTO.mapper(data, restaurante.uid)));

            case 7:
              restaurant = _context5.sent;
              restaurant.setMorada(morada);
              _context5.next = 11;
              return regeneratorRuntime.awrap(db.Menu.createOrUpdate(MenuPopulatorDTO.mapper(data.restaurant.menu)));

            case 11:
              menuInstance = _context5.sent;
              _context5.next = 14;
              return regeneratorRuntime.awrap(menuInstance.setRestaurante(restaurant));

            case 14:
              fotos = {
                categories: [],
                items: []
              };
              Object.keys(data.restaurant.pictures).forEach(function (key) {
                if (data.restaurant.pictures[key].thumbnail_type === "category") {
                  fotos.categories.push({
                    id: key.split("-")[1].trim(),
                    filename: data.restaurant.pictures[key].filename
                  });
                }

                if (data.restaurant.pictures[key].thumbnail_type === "menu_item") {
                  fotos.items.push({
                    id: key.split("-")[1].trim(),
                    filename: data.restaurant.pictures[key].filename
                  });
                }
              });
              data.restaurant.menu.categories.forEach(function _callee4(categorie) {
                var fotocat, filename, cat, groups, items;
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        fotocat = fotos.categories.find(function (foto) {
                          return foto.id == categorie.id;
                        });
                        filename = fotocat ? fotocat.filename : '';
                        console.log(CategoriaPopulatorDTO.mapper(categorie, filename));
                        _context4.next = 6;
                        return regeneratorRuntime.awrap(db.Categoria.createOrUpdate(CategoriaPopulatorDTO.mapper(categorie, fotocat.filename)));

                      case 6:
                        cat = _context4.sent;
                        _context4.next = 9;
                        return regeneratorRuntime.awrap(cat.setMenu(menuInstance));

                      case 9:
                        groups = categorie.groups;
                        items = categorie.items;
                        items.forEach(function _callee(item) {
                          var fotoitem, filename, itemInstance;
                          return regeneratorRuntime.async(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  fotoitem = fotos.items.find(function (foto) {
                                    return foto.id == item.id;
                                  });
                                  filename = fotoitem ? fotoitem.filename : '';
                                  _context.next = 4;
                                  return regeneratorRuntime.awrap(db.Produto.createOrUpdate(ProdutoPopulatorDTO.mapper(item, filename)));

                                case 4:
                                  itemInstance = _context.sent;
                                  _context.next = 7;
                                  return regeneratorRuntime.awrap(itemInstance.setRestaurante(restaurant));

                                case 7:
                                  _context.next = 9;
                                  return regeneratorRuntime.awrap(itemInstance.addCategorium(cat));

                                case 9:
                                  _context.t0 = itemInstance;
                                  _context.next = 12;
                                  return regeneratorRuntime.awrap(cat.getDataValue("id"));

                                case 12:
                                  _context.t1 = _context.sent;

                                  _context.t0.setDataValue.call(_context.t0, "CategoriumId", _context.t1);

                                  _context.next = 16;
                                  return regeneratorRuntime.awrap(itemInstance.save());

                                case 16:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          });
                        });
                        groups.forEach(function _callee3(group) {
                          var groupInstance;
                          return regeneratorRuntime.async(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return regeneratorRuntime.awrap(db.Grupo.createOrUpdate(GrupoPopulatorDTO.mapper(group)));

                                case 2:
                                  groupInstance = _context3.sent;
                                  _context3.next = 5;
                                  return regeneratorRuntime.awrap(cat.addGrupo(groupInstance));

                                case 5:
                                  _context3.next = 7;
                                  return regeneratorRuntime.awrap(groupInstance.setCategorium(cat));

                                case 7:
                                  group.options.forEach(function _callee2(option) {
                                    var optionInstance;
                                    return regeneratorRuntime.async(function _callee2$(_context2) {
                                      while (1) {
                                        switch (_context2.prev = _context2.next) {
                                          case 0:
                                            _context2.next = 2;
                                            return regeneratorRuntime.awrap(db.Opcao.createOrUpdate(OpcaoPopulatorDTO.mapper(option)));

                                          case 2:
                                            optionInstance = _context2.sent;
                                            _context2.next = 5;
                                            return regeneratorRuntime.awrap(optionInstance.setGrupo(groupInstance));

                                          case 5:
                                          case "end":
                                            return _context2.stop();
                                        }
                                      }
                                    });
                                  });

                                case 8:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          });
                        });
                        _context4.next = 17;
                        break;

                      case 15:
                        _context4.prev = 15;
                        _context4.t0 = _context4["catch"](0);

                      case 17:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, null, null, [[0, 15]]);
              });
              _context5.next = 22;
              break;

            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](1);
              console.log(_context5.t0);

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 19]]);
    });
  });
})();