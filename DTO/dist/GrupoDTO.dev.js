"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OpcaoDTO = require("./OpcaoDTO");

module.exports =
/*#__PURE__*/
function () {
  function GrupoDTO() {
    _classCallCheck(this, GrupoDTO);
  }

  _createClass(GrupoDTO, null, [{
    key: "mapper",
    value: function mapper(data) {
      return {
        id: data.get('id'),
        required: data.get('required'),
        force_max: data.get('force_max'),
        force_min: data.get('force_min'),
        nome: data.get('nome'),
        opcoes: data.get('Opcaos').map(OpcaoDTO.mapper)
      };
    }
  }]);

  return GrupoDTO;
}();