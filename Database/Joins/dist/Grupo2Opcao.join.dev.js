"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Grupo_Opcao() {
    _classCallCheck(this, Grupo_Opcao);
  }

  _createClass(Grupo_Opcao, null, [{
    key: "define",
    value: function define(con) {
      return con.define('Grupo_Opcao', {}, {
        timestamps: false
      });
    }
  }]);

  return Grupo_Opcao;
}();