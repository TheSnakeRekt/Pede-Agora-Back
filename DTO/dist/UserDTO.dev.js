"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MoradaDTO = require("./MoradaDTO");

module.exports =
/*#__PURE__*/
function () {
  function UserDTO() {
    _classCallCheck(this, UserDTO);
  }

  _createClass(UserDTO, null, [{
    key: "mapper",
    value: function mapper(user) {
      return {
        nome: user.nome,
        telefone: user.telefone,
        email: user.email,
        nif: user.nif,
        moradas: user.Moradas ? MoradaDTO.mapper(user.Moradas) : '',
        token: user.token ? user.token : ""
      };
    }
  }]);

  return UserDTO;
}();