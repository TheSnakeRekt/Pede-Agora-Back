module.exports = class RestaurantePopulatorDTO {
    static mapper(restauranteData,uidRest){
        return {
            nome: restauranteData.order.restaurant_name,
            telefone: restauranteData.restaurant.phone,
            tags: restauranteData.restaurant.cuisines,
            cdn: restauranteData.restaurant.cdn_base_path,
            desktop_widget:restauranteData.restaurant.pictures.desktop_widget.filename,
            uid: uidRest,
        }
    }
}