module.exports =class RestaurantePopulatorDTO {
    static mapper(restauranteData,uidRest){
        return {
            nome: restauranteData.order.restaurant_name,
            telefone: restauranteData.restaurant.phone,
            tags: restauranteData.restaurant.cuisines,
            cdn: restauranteData.restaurant.cdn_base_path,
            uid: uidRest,
        }
    }
}