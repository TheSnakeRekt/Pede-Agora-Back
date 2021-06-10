"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function MoradaDTO() {
    _classCallCheck(this, MoradaDTO);
  }

  _createClass(MoradaDTO, null, [{
    key: "mapper",
    value: function mapper(moradaEntity) {
      if (Array.isArray(moradaEntity)) {
        return moradaEntity.map(function (moradaEntity) {
          return {
            type: moradaEntity.get().type ? moradaEntity.get().type : 'home',
            name: moradaEntity.get().name ? moradaEntity.get().name : 'Casa',
            rua: moradaEntity.get().rua,
            codigoPostal: moradaEntity.get().codigoPostal,
            cidade: moradaEntity.get().cidade,
            distrito: moradaEntity.get().distrito ? moradaEntity.get().distrito : '',
            pais: moradaEntity.get().pais ? moradaEntity.get().pais : 'PT',
            latitude: moradaEntity.get().geo ? moradaEntity.get().geo.lat : moradaEntity.get().latitude,
            longitude: moradaEntity.get().geo ? moradaEntity.get().geo.lng : moradaEntity.get().longitude,
            "default": moradaEntity.get()["default"]
          };
        });
      }

      return [{
        type: moradaEntity.type ? moradaEntity.type : 'home',
        name: moradaEntity.name ? moradaEntity.name : 'Casa',
        rua: moradaEntity.rua,
        codigoPostal: moradaEntity.codigoPostal,
        cidade: moradaEntity.cidade,
        distrito: moradaEntity.distrito ? moradaEntity.distrito : '',
        pais: moradaEntity.pais ? moradaEntity.pais : 'PT',
        latitude: moradaEntity.geo ? moradaEntity.geo.lat : moradaEntity.latitude,
        longitude: moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude,
        "default": moradaEntity["default"]
      }];
    }
  }]);

  return MoradaDTO;
}();