module.exports = class GrupoPopulatorDTO {
    static mapper(data){
        return {
            id:data.id,
            nome:data.name,
            required:data.required,
            force_max:data.force_max,
            force_min:data.force_min,
        }
    }
}