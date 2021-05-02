"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function ProdutoDTO() {
    _classCallCheck(this, ProdutoDTO);
  }

  _createClass(ProdutoDTO, null, [{
    key: "mapper",
    value: function mapper(data, cdn) {
      return {
        id: data.get('id'),
        nome: data.get('nome'),
        foto: data.get('foto') ? "".concat(cdn).concat(data.get('foto')) : '',
        descricao: data.get('descricao'),
        tags: data.get('tags'),
        preco: data.get('valorCIva')
      };
    }
  }]);

  return ProdutoDTO;
}();