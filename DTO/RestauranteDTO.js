module.exports = class RestauranteDTO {
    static mapper(restauranteEntity){
       return{
        id:restauranteEntity.id,
        nome:restauranteEntity.nome,
        telefone:restauranteEntity.telefone,
        tags:restauranteEntity.tags.split(","),
        logo:`../assets/${restauranteEntity.logo}`,
        cdn:restauranteEntity.cdn,
        promo:restauranteEntity.promo,
        stars:restauranteEntity.cotacao,
        totalReviews:restauranteEntity.totalReviews,
        timing: restauranteEntity.timing,
        desktop_widget: restauranteEntity.desktop_widget,
        morada:{
            rua:`${restauranteEntity.Morada.rua}, ${restauranteEntity.Morada.codigoPostal} ${restauranteEntity.Morada.cidade}`,
            pais: restauranteEntity.Morada.pais,
            geo:{
                lat:restauranteEntity.Morada.latitude,
                lng:restauranteEntity.Morada.longitude,
            }
        }
       };
    }

    static mealMapper(restauranteEntity){
        return{
            
        }
    }
}