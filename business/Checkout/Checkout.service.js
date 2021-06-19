const db = require('../../Database/Database');
const Morada = require('../../Database/Entities/Morada.ent');
const LocationFinderService = require('../Shared/LocationFinder.service');

class CheckoutService {

    constructor(restaurantRepository, locationFinderService){
        this.restaurantRepository = restaurantRepository;
        this.locationFinderService = locationFinderService;
    }

    async distance(moradaRestaurant,morada){
        return this.locationFinderService.calculateDistanceInMeters(moradaRestaurant, morada);
    }
}

module.exports = new CheckoutService(db.Restaurante, LocationFinderService);