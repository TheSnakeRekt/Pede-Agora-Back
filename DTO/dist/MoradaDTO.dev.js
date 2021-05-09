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
        moradaEntity.map(function (moradaEntity) {
          return {
            type: moradaEntity.type ? moradaEntity.type : 'home',
            name: moradaEntity.name ? moradaEntity.name : 'Casa',
            rua: moradaEntity.rua,
            codigoPostal: moradaEntity.codigoPostal,
            cidade: moradaEntity.cidade,
            distrito: moradaEntity.distrito ? moradaEntity.distrito : '',
            pais: moradaEntity.pais,
            latitude: moradaEntity.geo ? moradaEntity.geo.lat : moradaEntity.latitude,
            longitude: moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude
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
        pais: moradaEntity.pais,
        latitude: moradaEntity.geo ? moradaEntity.geo.lat : moradaEntity.latitude,
        longitude: moradaEntity.geo ? moradaEntity.geo.lng : moradaEntity.longitude
      }];
    }
  }]);

  return MoradaDTO;
}();