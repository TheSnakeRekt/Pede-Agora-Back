"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function RestaurantePopulatorDTO() {
    _classCallCheck(this, RestaurantePopulatorDTO);
  }

  _createClass(RestaurantePopulatorDTO, null, [{
    key: "mapper",
    value: function mapper(restauranteData, uidRest) {
      console.log(restauranteData.restaurant.pictures.desktop_widget.filename);
      return {
        nome: restauranteData.order.restaurant_name,
        telefone: restauranteData.restaurant.phone,
        tags: restauranteData.restaurant.cuisines,
        cdn: restauranteData.restaurant.cdn_base_path,
        desktop_widget: restauranteData.restaurant.pictures.desktop_widget.filename,
        uid: uidRest
      };
    }
  }]);

  return RestaurantePopulatorDTO;
}();