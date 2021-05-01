"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function CategoriaPopulatorDTO() {
    _classCallCheck(this, CategoriaPopulatorDTO);
  }

  _createClass(CategoriaPopulatorDTO, null, [{
    key: "mapper",
    value: function mapper(data, file) {
      return {
        id: data.id,
        nome: data.name,
        descricao: data.description,
        foto: file
      };
    }
  }]);

  return CategoriaPopulatorDTO;
}();