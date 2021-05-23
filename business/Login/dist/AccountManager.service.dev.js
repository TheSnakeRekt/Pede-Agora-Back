"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var db = require('../../Database/Database');

var ContaDTO = require("../../DTO/ContaDTO");

var UserDTO = require("../../DTO/UserDTO");

var MoradaDTO = require("../../DTO/MoradaDTO");

var AuthenticationSystem = require('./AuthenticationSystem');

var SigninDTO = require('../../DTO/SigninDTO');

var LocationFinderService = require('../Shared/LocationFinder.service');

var AccountVerificationService = require('./AccountVerification.service');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var AccountManagerService =
/*#__PURE__*/
function (_AuthenticationSystem) {
  _inherits(AccountManagerService, _AuthenticationSystem);

  function AccountManagerService(contaRepository, clienteRepository, moradaRepository, locationFinderService, accountVerificationService) {
    var _this;

    _classCallCheck(this, AccountManagerService);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountManagerService).call(this));
    _this.contaRepository = contaRepository;
    _this.clienteRepository = clienteRepository;
    _this.moradaRepository = moradaRepository;
    _this.locationFinderService = locationFinderService;
    _this.accountVerificationService = accountVerificationService;
    return _this;
  }

  _createClass(AccountManagerService, [{
    key: "login",
    value: function login(user) {
      var userInstance;
      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!user.name) {
                _context.next = 9;
                break;
              }

              this.clienteRepository.sync();
              _context.next = 4;
              return regeneratorRuntime.awrap(this.clienteRepository.findOne({
                where: Sequelize.or({
                  email: user.name
                }, {
                  telefone: user.name
                }),
                nest: true,
                include: [{
                  model: this.contaRepository
                }, {
                  model: this.moradaRepository
                }]
              }));

            case 4:
              userInstance = _context.sent;

              if (!(userInstance != null)) {
                _context.next = 9;
                break;
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(AuthenticationSystem.authenticate(user.account.password, userInstance.Contum.password, UserDTO.mapper(userInstance)));

            case 8:
              return _context.abrupt("return", _context.sent);

            case 9:
              return _context.abrupt("return", false);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "checkToken",
    value: function checkToken(header) {
      var data, userInstance, user;
      return regeneratorRuntime.async(function checkToken$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = AuthenticationSystem.checkToken(header);

              if (!data) {
                _context2.next = 9;
                break;
              }

              _context2.next = 4;
              return regeneratorRuntime.awrap(this.clienteRepository.findOne({
                where: Sequelize.or({
                  email: data.email
                }, {
                  telefone: data.telefone
                }),
                nest: true,
                include: [this.contaRepository, this.moradaRepository]
              }));

            case 4:
              userInstance = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(AuthenticationSystem.sign(UserDTO.mapper(userInstance)));

            case 7:
              user = _context2.sent;
              return _context2.abrupt("return", {
                access: true,
                account: user
              });

            case 9:
              return _context2.abrupt("return", false);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "signIn",
    value: function signIn(data) {
      var password, user, alreadyExists, token, conta, userInstance, morada, userDTO;
      return regeneratorRuntime.async(function signIn$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.contaRepository.sync();
              _context3.next = 3;
              return regeneratorRuntime.awrap(AuthenticationSystem.createPassword(data.password));

            case 3:
              password = _context3.sent;
              user = SigninDTO.mapper(data, password);
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.locationFinderService.findGeoLoc(user.Morada));

            case 7:
              user.Morada.geo = _context3.sent;
              _context3.next = 10;
              return regeneratorRuntime.awrap(this.clienteRepository.findOne({
                where: Sequelize.or({
                  email: user.Utilizador.email
                }, {
                  telefone: user.Utilizador.telefone
                }),
                raw: true
              }));

            case 10:
              alreadyExists = _context3.sent;

              if (!alreadyExists) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", false);

            case 13:
              token = AuthenticationSystem.randomToken();
              _context3.next = 16;
              return regeneratorRuntime.awrap(this.contaRepository.create(ContaDTO.mapper(user.Conta, token)));

            case 16:
              conta = _context3.sent;
              _context3.next = 19;
              return regeneratorRuntime.awrap(this.clienteRepository.create(UserDTO.mapper(user.Utilizador)));

            case 19:
              userInstance = _context3.sent;
              _context3.next = 22;
              return regeneratorRuntime.awrap(this.moradaRepository.build(MoradaDTO.mapper(user.Morada)));

            case 22:
              morada = _context3.sent;
              _context3.next = 25;
              return regeneratorRuntime.awrap(morada[0].save());

            case 25:
              _context3.next = 27;
              return regeneratorRuntime.awrap(userInstance.setContum(conta));

            case 27:
              _context3.next = 29;
              return regeneratorRuntime.awrap(userInstance.addMorada(morada[0]));

            case 29:
              userInstance.MoradaId = morada[0].id;
              _context3.next = 32;
              return regeneratorRuntime.awrap(userInstance.save());

            case 32:
              userDTO = AuthenticationSystem.sign(UserDTO.mapper(userInstance));
              userDTO.morada = MoradaDTO.mapper(morada);
              this.accountVerificationService.sendEmailVerification(userInstance.email, userInstance.nome, token);
              return _context3.abrupt("return", {
                access: true,
                account: userDTO
              });

            case 36:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAccountEmail",
    value: function verifyAccountEmail(token) {
      var conta, _ref, _ref2, numberOfAffectedRows;

      return regeneratorRuntime.async(function verifyAccountEmail$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.contaRepository.sync();
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.contaRepository.findOne({
                where: {
                  verifyCode: token,
                  verified: false
                },
                raw: true
              }));

            case 3:
              conta = _context4.sent;

              if (conta) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", false);

            case 6:
              if (conta.verified) {
                _context4.next = 13;
                break;
              }

              _context4.next = 9;
              return regeneratorRuntime.awrap(this.contaRepository.update({
                verified: true,
                verifyCode: ''
              }, {
                where: {
                  id: conta.id
                }
              }));

            case 9:
              _ref = _context4.sent;
              _ref2 = _slicedToArray(_ref, 1);
              numberOfAffectedRows = _ref2[0];
              return _context4.abrupt("return", numberOfAffectedRows >= 1);

            case 13:
              return _context4.abrupt("return", conta.verified);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAccountPhone",
    value: function verifyAccountPhone(code, phone) {
      return regeneratorRuntime.async(function verifyAccountPhone$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "addAddress",
    value: function addAddress(token, address) {
      var userInstance, geo, morada;
      return regeneratorRuntime.async(function addAddress$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!token.access) {
                _context6.next = 25;
                break;
              }

              _context6.prev = 1;
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.clienteRepository.findOne({
                where: Sequelize.or({
                  email: token.account.email
                }, {
                  telefone: token.account.telefone
                }),
                nest: true,
                include: [this.contaRepository, this.moradaRepository]
              }));

            case 4:
              userInstance = _context6.sent;
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.locationFinderService.findGeoLoc(address));

            case 7:
              geo = _context6.sent;

              if (geo) {
                _context6.next = 10;
                break;
              }

              return _context6.abrupt("return", false);

            case 10:
              address.geo = geo;
              morada = this.moradaRepository.build(MoradaDTO.mapper(address));
              _context6.next = 14;
              return regeneratorRuntime.awrap(morada[0].save());

            case 14:
              _context6.next = 16;
              return regeneratorRuntime.awrap(userInstance.addMorada(morada[0]));

            case 16:
              _context6.next = 18;
              return regeneratorRuntime.awrap(userInstance.save());

            case 18:
              return _context6.abrupt("return", true);

            case 21:
              _context6.prev = 21;
              _context6.t0 = _context6["catch"](1);
              console.error(_context6.t0);
              return _context6.abrupt("return", false);

            case 25:
              return _context6.abrupt("return", false);

            case 26:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[1, 21]]);
    }
  }, {
    key: "removeAddress",
    value: function removeAddress(token, address) {
      var userInstance, morada;
      return regeneratorRuntime.async(function removeAddress$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!token.access) {
                _context7.next = 19;
                break;
              }

              _context7.prev = 1;
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.clienteRepository.findOne({
                where: Sequelize.or({
                  email: token.account.email
                }, {
                  telefone: token.account.telefone
                }),
                nest: true,
                include: [this.contaRepository, this.moradaRepository]
              }));

            case 4:
              userInstance = _context7.sent;
              _context7.next = 7;
              return regeneratorRuntime.awrap(userInstance.Moradas.find(function (elem) {
                return elem.get().name == address;
              }));

            case 7:
              morada = _context7.sent;
              _context7.next = 10;
              return regeneratorRuntime.awrap(morada.destroy());

            case 10:
              _context7.next = 12;
              return regeneratorRuntime.awrap(userInstance.save());

            case 12:
              return _context7.abrupt("return", true);

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](1);
              console.error(_context7.t0);
              return _context7.abrupt("return", false);

            case 19:
              return _context7.abrupt("return", false);

            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[1, 15]]);
    }
  }]);

  return AccountManagerService;
}(AuthenticationSystem);

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada, LocationFinderService, AccountVerificationService);