"use strict";

var _require = require("./RestaurantHook"),
    API_URL = _require.API_URL,
    REQUEST_BODY = _require.REQUEST_BODY;

var db = require('../../../Database/Database');

var axios = require("axios");

var restaurant_server = require("./restaurant_server.json");

var MoradaPopulatorDTO = require("./DTO/MoradaPopulatorDTO");

var RestaurantePopulatorDTO = require("./DTO/RestaurantePopulatorDTO");

(function () {
  restaurant_server.forEach(function (restaurante) {
    var request_body = new REQUEST_BODY(restaurante.uid);
    axios.post(API_URL, request_body).then(function _callee(resp) {
      var data, morada, restaurant;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = resp.data;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(db.Morada.createOrUpdate(MoradaPopulatorDTO.mapper(data.restaurant.restaurantAccount, JSON.parse(data.restaurant.delivery_zones[0].shape_json))));

            case 4:
              morada = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(db.Restaurante.createOrUpdate(RestaurantePopulatorDTO.mapper(data, restaurante.uid)));

            case 7:
              restaurant = _context.sent;
              restaurant.setMorada(morada);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 11]]);
    });
  });
})();