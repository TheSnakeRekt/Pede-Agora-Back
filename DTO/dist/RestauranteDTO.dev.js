"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function RestauranteDTO() {
    _classCallCheck(this, RestauranteDTO);
  }

  _createClass(RestauranteDTO, null, [{
    key: "mapper",
    value: function mapper(restauranteEntity) {
      return {
        id: restauranteEntity.id,
        nome: restauranteEntity.nome,
        telefone: restauranteEntity.telefone,
        tags: restauranteEntity.tags.split(","),
        logo: "../assets/".concat(restauranteEntity.logo),
        cdn: restauranteEntity.cdn,
        promo: restauranteEntity.promo,
        stars: restauranteEntity.cotacao,
        totalReviews: restauranteEntity.totalReviews,
        timing: restauranteEntity.timing,
        desktop_widget: restauranteEntity.desktop_widget,
        morada: {
          rua: "".concat(restauranteEntity.Morada.rua, ", ").concat(restauranteEntity.Morada.codigoPostal, " ").concat(restauranteEntity.Morada.cidade),
          pais: restauranteEntity.Morada.pais,
          geo: {
            lat: restauranteEntity.Morada.latitude,
            lng: restauranteEntity.Morada.longitude
          }
        }
      };
    }
  }]);

  return RestauranteDTO;
}();