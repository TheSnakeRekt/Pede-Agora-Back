"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GrupoDTO = require("./GrupoDTO");

var ProdutoDTO = require("./ProdutoDTO");

module.exports =
/*#__PURE__*/
function () {
  function MenuDTO() {
    _classCallCheck(this, MenuDTO);
  }

  _createClass(MenuDTO, null, [{
    key: "mapper",
    value: function mapper(data, cdn) {
      return {
        id: data.get('id'),
        nome: data.get('nome'),
        active: data.get('active'),
        foto: data.get('foto') ? "".concat(cdn).concat(data.get('foto')) : '',
        grupos: data.get('Grupos') ? data.get('Grupos').map(GrupoDTO.mapper) : [],
        produtos: data.get('Produtos') ? data.get('Produtos').map(function (prod) {
          return ProdutoDTO.mapper(prod, cdn);
        }) : []
      };
    }
  }]);

  return MenuDTO;
}();