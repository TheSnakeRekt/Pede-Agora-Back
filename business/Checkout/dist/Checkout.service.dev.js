"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../../Database/Database');

var Morada = require('../../Database/Entities/Morada.ent');

var LocationFinderService = require('../Shared/LocationFinder.service');

var CheckoutService =
/*#__PURE__*/
function () {
  function CheckoutService(restaurantRepository, locationFinderService) {
    _classCallCheck(this, CheckoutService);

    this.restaurantRepository = restaurantRepository;
    this.locationFinderService = locationFinderService;
  }

  _createClass(CheckoutService, [{
    key: "distance",
    value: function distance(cart) {
      var restaurant;
      return regeneratorRuntime.async(function distance$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.restaurantRepository.findOne({
                where: {
                  id: cart.restaurant.id
                }
              }, {
                include: Morada
              }));

            case 2:
              restaurant = _context.sent;
              return _context.abrupt("return", this.locationFinderService.calculateDistanceInMeters(restaurant.Morada, cart.cliente));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return CheckoutService;
}();

module.exports = new CheckoutService(db.Restaurante, LocationFinderService);