"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var crypto = require('crypto');

var JWT_SECRET = "0nHsn1*HrfFHa@hkC5pe20HHE5xTwh#P4u!%YWt%M#nhjpHxT5";

var AuthenticationSystem =
/*#__PURE__*/
function () {
  function AuthenticationSystem() {
    _classCallCheck(this, AuthenticationSystem);
  }

  _createClass(AuthenticationSystem, null, [{
    key: "authenticate",
    value: function authenticate(inputPassword, instancePassword) {
      var isValid;
      return regeneratorRuntime.async(function authenticate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(bcrypt.compare(inputPassword, instancePassword));

            case 3:
              isValid = _context.sent;

              if (!isValid) {
                _context.next = 7;
                break;
              }

              user.token = jwt.sign(user, JWT_SECRET, {
                expiresIn: '2h'
              });
              return _context.abrupt("return", {
                access: true,
                account: user
              });

            case 7:
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

            case 12:
              return _context.abrupt("return", {
                access: false
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "authenticate",
    value: function authenticate(inputPassword, instancePassword, user) {
      var isValid;
      return regeneratorRuntime.async(function authenticate$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(bcrypt.compare(inputPassword, instancePassword));

            case 3:
              isValid = _context2.sent;

              if (!isValid) {
                _context2.next = 7;
                break;
              }

              user.token = jwt.sign(user, JWT_SECRET, {
                expiresIn: '2h'
              });
              return _context2.abrupt("return", {
                access: true,
                account: user
              });

            case 7:
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 12:
              return _context2.abrupt("return", {
                access: false
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "createPassword",
    value: function createPassword(inputPassword) {
      return regeneratorRuntime.async(function createPassword$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(bcrypt.hash(inputPassword, 12));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
  }, {
    key: "randomToken",
    value: function randomToken() {
      return crypto.randomBytes(16).toString('hex');
    }
  }, {
    key: "checkToken",
    value: function checkToken(header) {
      if (typeof header == 'undefined' || header == '') {
        return false;
      }

      try {
        return jwt.verify(header, JWT_SECRET);
      } catch (error) {
        return false;
      }
    }
  }, {
    key: "sign",
    value: function sign(user) {
      user.token = jwt.sign(user, JWT_SECRET, {
        expiresIn: '2h'
      });
      return user;
    }
  }]);

  return AuthenticationSystem;
}();

module.exports = AuthenticationSystem;