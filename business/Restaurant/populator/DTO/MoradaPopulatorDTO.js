module.exports = class MoradaPopulatorDTO {
    static mapper(restauranteAccount, restaurantGEOIP){
        return {
            rua : restauranteAccount.street,
            cidade : restauranteAccount.city,
            distrito : restauranteAccount.distrito ? restauranteAccount.distrito : '',
            codigoPostal : restauranteAccount.zipcode,
            pais : restauranteAccount.country_code,
            latitude : restaurantGEOIP.center.lat,
            longitude : restaurantGEOIP.center.lng
        };
    }
}