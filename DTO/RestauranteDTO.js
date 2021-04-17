module.exports =class RestauranteDTO {
    static mapper(restauranteData,uidRest){
        return {
            nome:restauranteData.order.restaurant_name,
            telefone:restauranteData.restaurant.phone,
            uid:uidRest
        }
    }
}