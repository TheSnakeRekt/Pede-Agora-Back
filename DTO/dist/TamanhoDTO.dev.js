"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GrupoDTO = require("./GrupoDTO");

module.exports =
/*#__PURE__*/
function () {
  function TamanhoDTO() {
    _classCallCheck(this, TamanhoDTO);
  }

  _createClass(TamanhoDTO, null, [{
    key: "mapper",
    value: function mapper(data) {
      console.log(data);
      return {
        id: data.get('id'),
        preco: data.get('preco'),
        nome: data.get('nome'),
        "default": data.get('default'),
        grupos: data.get('grupos') ? data.get('grupos').map(GrupoDTO.mapper) : []
      };
    }
  }]);

  return TamanhoDTO;
}();