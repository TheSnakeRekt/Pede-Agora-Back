const db = require('../../Database/Database');
const Morada = require('../../Database/Entities/Morada.ent');
const LocationFinderService = require('../Shared/LocationFinder.service');

class CheckoutService {

    constructor(restaurantRepository, locationFinderService){
        this.restaurantRepository = restaurantRepository;
        this.locationFinderService = locationFinderService;
    }

    async distance(cart){
        let restaurant = await this.restaurantRepository.findOne({where:{id:cart.restaurant.id}}, {include:Morada});

        return this.locationFinderService.calculateDistanceInMeters(restaurant.Morada, cart.cliente);
    }
}

module.exports = new CheckoutService(db.Restaurante, LocationFinderService);