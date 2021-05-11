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

var TamanhoPopulatorDTO = require("./DTO/TamanhoPopulatorDTO");

(function () {
  restaurant_server.forEach(function (restaurante) {
    var request_body = new REQUEST_BODY(restaurante.uid);
    axios.post(API_URL, request_body).then(function _callee2(resp) {
      var data, morada, restaurant, menuInstance, fotos;
      return regeneratorRuntime.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = resp.data;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(db.Morada.createOrUpdate(MoradaPopulatorDTO.mapper(data.restaurant.restaurantAccount, JSON.parse(data.restaurant.delivery_zones[0].shape_json))));

            case 4:
              morada = _context3.sent;
              _context3.next = 7;
              return regeneratorRuntime.awrap(db.Restaurante.createOrUpdate(RestaurantePopulatorDTO.mapper(data, restaurante.uid)));

            case 7:
              restaurant = _context3.sent;
              restaurant.setMorada(morada);
              _context3.next = 11;
              return regeneratorRuntime.awrap(db.Menu.createOrUpdate(MenuPopulatorDTO.mapper(data.restaurant.menu)));

            case 11:
              menuInstance = _context3.sent;
              _context3.next = 14;
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
              data.restaurant.menu.categories.forEach(function _callee(categorie) {
                var fotocat, filename, cat, groups, items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, group, groupInstance, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, option, optionInstance;

                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        fotocat = fotos.categories.find(function (foto) {
                          return foto.id == categorie.id;
                        });
                        filename = fotocat ? fotocat.filename : '';
                        _context2.next = 5;
                        return regeneratorRuntime.awrap(db.Categoria.createOrUpdate(CategoriaPopulatorDTO.mapper(categorie, filename)));

                      case 5:
                        cat = _context2.sent;
                        _context2.next = 8;
                        return regeneratorRuntime.awrap(cat.setMenu(menuInstance));

                      case 8:
                        groups = categorie.groups;
                        items = categorie.items;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 13;

                        _loop = function _loop() {
                          var item, fotoitem, filename, itemInstance, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _data, tamanhoInstance, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, grupo, groupTamanhoInstance, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, opcao, optionInstance, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _grupo, groupProdutoInstance, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _opcao, optionProdutoInstance;

                          return regeneratorRuntime.async(function _loop$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  item = _step.value;
                                  fotoitem = fotos.items.find(function (foto) {
                                    return foto.id == item.id;
                                  });
                                  filename = fotoitem ? fotoitem.filename : '';
                                  _context.next = 5;
                                  return regeneratorRuntime.awrap(db.Produto.createOrUpdate(ProdutoPopulatorDTO.mapper(item, filename)));

                                case 5:
                                  itemInstance = _context.sent;
                                  _iteratorNormalCompletion3 = true;
                                  _didIteratorError3 = false;
                                  _iteratorError3 = undefined;
                                  _context.prev = 9;
                                  _iterator3 = item.sizes[Symbol.iterator]();

                                case 11:
                                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context.next = 87;
                                    break;
                                  }

                                  _data = _step3.value;
                                  _context.next = 15;
                                  return regeneratorRuntime.awrap(db.Tamanho.createOrUpdate(TamanhoPopulatorDTO.mapper(_data)));

                                case 15:
                                  tamanhoInstance = _context.sent;
                                  _iteratorNormalCompletion5 = true;
                                  _didIteratorError5 = false;
                                  _iteratorError5 = undefined;
                                  _context.prev = 19;
                                  _iterator5 = _data.groups[Symbol.iterator]();

                                case 21:
                                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                    _context.next = 66;
                                    break;
                                  }

                                  grupo = _step5.value;
                                  _context.next = 25;
                                  return regeneratorRuntime.awrap(db.GrupoTamanho.createOrUpdate(GrupoPopulatorDTO.mapper(grupo)));

                                case 25:
                                  groupTamanhoInstance = _context.sent;
                                  _iteratorNormalCompletion6 = true;
                                  _didIteratorError6 = false;
                                  _iteratorError6 = undefined;
                                  _context.prev = 29;
                                  _iterator6 = grupo.options[Symbol.iterator]();

                                case 31:
                                  if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                                    _context.next = 45;
                                    break;
                                  }

                                  opcao = _step6.value;
                                  _context.next = 35;
                                  return regeneratorRuntime.awrap(db.OpcaoGrupoTamanho.createOrUpdate(OpcaoPopulatorDTO.mapper(opcao)));

                                case 35:
                                  optionInstance = _context.sent;
                                  _context.next = 38;
                                  return regeneratorRuntime.awrap(groupTamanhoInstance.addOpcoes(optionInstance));

                                case 38:
                                  _context.next = 40;
                                  return regeneratorRuntime.awrap(optionInstance.setGrupoTamanho(groupTamanhoInstance));

                                case 40:
                                  _context.next = 42;
                                  return regeneratorRuntime.awrap(optionInstance.save());

                                case 42:
                                  _iteratorNormalCompletion6 = true;
                                  _context.next = 31;
                                  break;

                                case 45:
                                  _context.next = 51;
                                  break;

                                case 47:
                                  _context.prev = 47;
                                  _context.t0 = _context["catch"](29);
                                  _didIteratorError6 = true;
                                  _iteratorError6 = _context.t0;

                                case 51:
                                  _context.prev = 51;
                                  _context.prev = 52;

                                  if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                                    _iterator6["return"]();
                                  }

                                case 54:
                                  _context.prev = 54;

                                  if (!_didIteratorError6) {
                                    _context.next = 57;
                                    break;
                                  }

                                  throw _iteratorError6;

                                case 57:
                                  return _context.finish(54);

                                case 58:
                                  return _context.finish(51);

                                case 59:
                                  _context.next = 61;
                                  return regeneratorRuntime.awrap(tamanhoInstance.addGrupoTamanho(groupTamanhoInstance));

                                case 61:
                                  _context.next = 63;
                                  return regeneratorRuntime.awrap(groupTamanhoInstance.save());

                                case 63:
                                  _iteratorNormalCompletion5 = true;
                                  _context.next = 21;
                                  break;

                                case 66:
                                  _context.next = 72;
                                  break;

                                case 68:
                                  _context.prev = 68;
                                  _context.t1 = _context["catch"](19);
                                  _didIteratorError5 = true;
                                  _iteratorError5 = _context.t1;

                                case 72:
                                  _context.prev = 72;
                                  _context.prev = 73;

                                  if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                                    _iterator5["return"]();
                                  }

                                case 75:
                                  _context.prev = 75;

                                  if (!_didIteratorError5) {
                                    _context.next = 78;
                                    break;
                                  }

                                  throw _iteratorError5;

                                case 78:
                                  return _context.finish(75);

                                case 79:
                                  return _context.finish(72);

                                case 80:
                                  _context.next = 82;
                                  return regeneratorRuntime.awrap(itemInstance.addTamanho(tamanhoInstance));

                                case 82:
                                  _context.next = 84;
                                  return regeneratorRuntime.awrap(tamanhoInstance.setProduto(itemInstance));

                                case 84:
                                  _iteratorNormalCompletion3 = true;
                                  _context.next = 11;
                                  break;

                                case 87:
                                  _context.next = 93;
                                  break;

                                case 89:
                                  _context.prev = 89;
                                  _context.t2 = _context["catch"](9);
                                  _didIteratorError3 = true;
                                  _iteratorError3 = _context.t2;

                                case 93:
                                  _context.prev = 93;
                                  _context.prev = 94;

                                  if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                                    _iterator3["return"]();
                                  }

                                case 96:
                                  _context.prev = 96;

                                  if (!_didIteratorError3) {
                                    _context.next = 99;
                                    break;
                                  }

                                  throw _iteratorError3;

                                case 99:
                                  return _context.finish(96);

                                case 100:
                                  return _context.finish(93);

                                case 101:
                                  _iteratorNormalCompletion4 = true;
                                  _didIteratorError4 = false;
                                  _iteratorError4 = undefined;
                                  _context.prev = 104;
                                  _iterator4 = item.groups[Symbol.iterator]();

                                case 106:
                                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                    _context.next = 153;
                                    break;
                                  }

                                  _grupo = _step4.value;
                                  _context.next = 110;
                                  return regeneratorRuntime.awrap(db.GrupoProduto.createOrUpdate(GrupoPopulatorDTO.mapper(_grupo)));

                                case 110:
                                  groupProdutoInstance = _context.sent;
                                  _iteratorNormalCompletion7 = true;
                                  _didIteratorError7 = false;
                                  _iteratorError7 = undefined;
                                  _context.prev = 114;
                                  _iterator7 = _grupo.options[Symbol.iterator]();

                                case 116:
                                  if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                                    _context.next = 130;
                                    break;
                                  }

                                  _opcao = _step7.value;
                                  _context.next = 120;
                                  return regeneratorRuntime.awrap(db.OpcaoGrupoProduto.createOrUpdate(OpcaoPopulatorDTO.mapper(_opcao)));

                                case 120:
                                  optionProdutoInstance = _context.sent;
                                  _context.next = 123;
                                  return regeneratorRuntime.awrap(groupProdutoInstance.addOpcoes(optionProdutoInstance));

                                case 123:
                                  _context.next = 125;
                                  return regeneratorRuntime.awrap(optionProdutoInstance.setGrupoProduto(groupProdutoInstance));

                                case 125:
                                  _context.next = 127;
                                  return regeneratorRuntime.awrap(optionProdutoInstance.save());

                                case 127:
                                  _iteratorNormalCompletion7 = true;
                                  _context.next = 116;
                                  break;

                                case 130:
                                  _context.next = 136;
                                  break;

                                case 132:
                                  _context.prev = 132;
                                  _context.t3 = _context["catch"](114);
                                  _didIteratorError7 = true;
                                  _iteratorError7 = _context.t3;

                                case 136:
                                  _context.prev = 136;
                                  _context.prev = 137;

                                  if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                                    _iterator7["return"]();
                                  }

                                case 139:
                                  _context.prev = 139;

                                  if (!_didIteratorError7) {
                                    _context.next = 142;
                                    break;
                                  }

                                  throw _iteratorError7;

                                case 142:
                                  return _context.finish(139);

                                case 143:
                                  return _context.finish(136);

                                case 144:
                                  _context.next = 146;
                                  return regeneratorRuntime.awrap(itemInstance.addGrupoProduto(groupProdutoInstance));

                                case 146:
                                  _context.next = 148;
                                  return regeneratorRuntime.awrap(groupProdutoInstance.addProduto(itemInstance));

                                case 148:
                                  _context.next = 150;
                                  return regeneratorRuntime.awrap(groupProdutoInstance.save());

                                case 150:
                                  _iteratorNormalCompletion4 = true;
                                  _context.next = 106;
                                  break;

                                case 153:
                                  _context.next = 159;
                                  break;

                                case 155:
                                  _context.prev = 155;
                                  _context.t4 = _context["catch"](104);
                                  _didIteratorError4 = true;
                                  _iteratorError4 = _context.t4;

                                case 159:
                                  _context.prev = 159;
                                  _context.prev = 160;

                                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                                    _iterator4["return"]();
                                  }

                                case 162:
                                  _context.prev = 162;

                                  if (!_didIteratorError4) {
                                    _context.next = 165;
                                    break;
                                  }

                                  throw _iteratorError4;

                                case 165:
                                  return _context.finish(162);

                                case 166:
                                  return _context.finish(159);

                                case 167:
                                  _context.next = 169;
                                  return regeneratorRuntime.awrap(itemInstance.setRestaurante(restaurant));

                                case 169:
                                  _context.next = 171;
                                  return regeneratorRuntime.awrap(itemInstance.addCategorium(cat));

                                case 171:
                                  _context.t5 = itemInstance;
                                  _context.next = 174;
                                  return regeneratorRuntime.awrap(cat.getDataValue("id"));

                                case 174:
                                  _context.t6 = _context.sent;

                                  _context.t5.setDataValue.call(_context.t5, "CategoriumId", _context.t6);

                                  _context.next = 178;
                                  return regeneratorRuntime.awrap(itemInstance.save());

                                case 178:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, null, null, [[9, 89, 93, 101], [19, 68, 72, 80], [29, 47, 51, 59], [52,, 54, 58], [73,, 75, 79], [94,, 96, 100], [104, 155, 159, 167], [114, 132, 136, 144], [137,, 139, 143], [160,, 162, 166]]);
                        };

                        _iterator = items[Symbol.iterator]();

                      case 16:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                          _context2.next = 22;
                          break;
                        }

                        _context2.next = 19;
                        return regeneratorRuntime.awrap(_loop());

                      case 19:
                        _iteratorNormalCompletion = true;
                        _context2.next = 16;
                        break;

                      case 22:
                        _context2.next = 28;
                        break;

                      case 24:
                        _context2.prev = 24;
                        _context2.t0 = _context2["catch"](13);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                      case 28:
                        _context2.prev = 28;
                        _context2.prev = 29;

                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                          _iterator["return"]();
                        }

                      case 31:
                        _context2.prev = 31;

                        if (!_didIteratorError) {
                          _context2.next = 34;
                          break;
                        }

                        throw _iteratorError;

                      case 34:
                        return _context2.finish(31);

                      case 35:
                        return _context2.finish(28);

                      case 36:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 39;
                        _iterator2 = groups[Symbol.iterator]();

                      case 41:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                          _context2.next = 84;
                          break;
                        }

                        group = _step2.value;
                        _context2.next = 45;
                        return regeneratorRuntime.awrap(db.Grupo.createOrUpdate(GrupoPopulatorDTO.mapper(group)));

                      case 45:
                        groupInstance = _context2.sent;
                        _context2.next = 48;
                        return regeneratorRuntime.awrap(cat.addGrupo(groupInstance));

                      case 48:
                        _context2.next = 50;
                        return regeneratorRuntime.awrap(groupInstance.setCategorium(cat));

                      case 50:
                        _iteratorNormalCompletion8 = true;
                        _didIteratorError8 = false;
                        _iteratorError8 = undefined;
                        _context2.prev = 53;
                        _iterator8 = group.options[Symbol.iterator]();

                      case 55:
                        if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                          _context2.next = 67;
                          break;
                        }

                        option = _step8.value;
                        _context2.next = 59;
                        return regeneratorRuntime.awrap(db.Opcao.createOrUpdate(OpcaoPopulatorDTO.mapper(option)));

                      case 59:
                        optionInstance = _context2.sent;
                        _context2.next = 62;
                        return regeneratorRuntime.awrap(groupInstance.addOpcoes(optionInstance));

                      case 62:
                        _context2.next = 64;
                        return regeneratorRuntime.awrap(optionInstance.setGrupo(groupInstance));

                      case 64:
                        _iteratorNormalCompletion8 = true;
                        _context2.next = 55;
                        break;

                      case 67:
                        _context2.next = 73;
                        break;

                      case 69:
                        _context2.prev = 69;
                        _context2.t1 = _context2["catch"](53);
                        _didIteratorError8 = true;
                        _iteratorError8 = _context2.t1;

                      case 73:
                        _context2.prev = 73;
                        _context2.prev = 74;

                        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                          _iterator8["return"]();
                        }

                      case 76:
                        _context2.prev = 76;

                        if (!_didIteratorError8) {
                          _context2.next = 79;
                          break;
                        }

                        throw _iteratorError8;

                      case 79:
                        return _context2.finish(76);

                      case 80:
                        return _context2.finish(73);

                      case 81:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 41;
                        break;

                      case 84:
                        _context2.next = 90;
                        break;

                      case 86:
                        _context2.prev = 86;
                        _context2.t2 = _context2["catch"](39);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t2;

                      case 90:
                        _context2.prev = 90;
                        _context2.prev = 91;

                        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                          _iterator2["return"]();
                        }

                      case 93:
                        _context2.prev = 93;

                        if (!_didIteratorError2) {
                          _context2.next = 96;
                          break;
                        }

                        throw _iteratorError2;

                      case 96:
                        return _context2.finish(93);

                      case 97:
                        return _context2.finish(90);

                      case 98:
                        _context2.next = 103;
                        break;

                      case 100:
                        _context2.prev = 100;
                        _context2.t3 = _context2["catch"](0);
                        console.error(_context2.t3);

                      case 103:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, null, [[0, 100], [13, 24, 28, 36], [29,, 31, 35], [39, 86, 90, 98], [53, 69, 73, 81], [74,, 76, 80], [91,, 93, 97]]);
              });
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 19]]);
    });
  });
})();