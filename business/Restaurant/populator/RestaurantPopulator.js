const { API_URL, REQUEST_BODY } = require("./RestaurantHook");
const db = require('../../../Database/Database');
const axios = require("axios");
const restaurant_server = require("./restaurant_server.json");
const MoradaPopulatorDTO = require("./DTO/MoradaPopulatorDTO");
const RestaurantePopulatorDTO = require("./DTO/RestaurantePopulatorDTO");
const CategoriaPopulatorDTO = require("./DTO/CategoriaPopulatorDTO");
const ProdutoPopulatorDTO = require("./DTO/ProdutoPopulatorDTO");
const GrupoPopulatorDTO = require("./DTO/GrupoPopulatorDTO");
const OpcaoPopulatorDTO = require("./DTO/OpcaoPopulatorDTO");
const MenuPopulatorDTO = require("./DTO/MenuPopulatorDTO");
const TamanhoPopulatorDTO = require("./DTO/TamanhoPopulatorDTO");

(()=>{
    restaurant_server.forEach(restaurante=>{
        let request_body = new REQUEST_BODY(restaurante.uid);
        axios.post(API_URL,request_body).then(async resp=>{
            let data = resp.data;
            
            try {
                const morada = await db.Morada.createOrUpdate(MoradaPopulatorDTO.mapper(data.restaurant.restaurantAccount, 
                                                                                JSON.parse(data.restaurant.delivery_zones[0].shape_json)));
                const restaurant = await db.Restaurante.createOrUpdate(RestaurantePopulatorDTO.mapper(data,restaurante.uid));
                restaurant.setMorada(morada);

                const menuInstance = await db.Menu.createOrUpdate(MenuPopulatorDTO.mapper(data.restaurant.menu));
                await menuInstance.setRestaurante(restaurant);
                const fotos = {
                    categories:[],
                    items:[]
                }
               
                Object.keys(data.restaurant.pictures).forEach(key=>{
                    if(data.restaurant.pictures[key].thumbnail_type === "category"){
                        fotos.categories.push({
                            id:key.split("-")[1].trim(),
                            filename:data.restaurant.pictures[key].filename
                        });
                    }
                    if(data.restaurant.pictures[key].thumbnail_type === "menu_item"){
                        fotos.items.push({
                            id:key.split("-")[1].trim(),
                            filename:data.restaurant.pictures[key].filename
                        });
                    }
                });

                data.restaurant.menu.categories.forEach(async categorie =>{
                    try {
                        let fotocat =  fotos.categories.find(foto=> foto.id == categorie.id);
                        let filename = fotocat? fotocat.filename: '';


                        const cat = await db.Categoria.createOrUpdate(CategoriaPopulatorDTO.mapper(categorie,filename));
                        await cat.setMenu(menuInstance);

                        const groups = categorie.groups;
                        const items = categorie.items;

                        items.forEach(async item =>{
                            let fotoitem = fotos.items.find(foto=>foto.id == item.id);
                            let filename = fotoitem? fotoitem.filename: '';
                            const itemInstance = await db.Produto.createOrUpdate(ProdutoPopulatorDTO.mapper(item, filename));

                            item.sizes.forEach(async data=>{
                                const tamanhoInstance = await db.Tamanho.createOrUpdate(TamanhoPopulatorDTO.mapper(data));

                                data.groups.forEach(async grupo =>{
                                    const groupInstance = await db.GrupoTamanho.createOrUpdate(GrupoPopulatorDTO.mapper(grupo));

                                    grupo.options.forEach(async opcao=>{
                                        const optionInstance = await db.OpcaoGrupoTamanho.createOrUpdate(OpcaoPopulatorDTO.mapper(opcao));

                                        await groupInstance.addOpcaoGrupoTamanho(optionInstance);
                                        await optionInstance.setGrupoTamanho(groupInstance);

                                        await optionInstance.save();
                                    });
                                    

                                    await tamanhoInstance.addGrupoTamanho(groupInstance);
                                    await groupInstance.setTamanho(tamanhoInstance);
                                    await groupInstance.save();
                                });
                              
                               
                                await itemInstance.addTamanho(tamanhoInstance);
                                await tamanhoInstance.setProduto(itemInstance);
                            });
                            

                            await itemInstance.setRestaurante(restaurant);
                            await itemInstance.addCategorium(cat);
                            
                            itemInstance.setDataValue("CategoriumId",await cat.getDataValue("id"));
                            await itemInstance.save();
                        });

                        groups.forEach(async group=>{
                            const groupInstance = await db.Grupo.createOrUpdate(GrupoPopulatorDTO.mapper(group));
                            await cat.addGrupo(groupInstance);
                            await groupInstance.setCategorium(cat);

                            group.options.forEach(async option=>{
                                const optionInstance = await db.Opcao.createOrUpdate(OpcaoPopulatorDTO.mapper(option));
                                await groupInstance.addOpcao(optionInstance);
                                await optionInstance.setGrupo(groupInstance);
                            });
                        });
                    } catch (error) {
                
                    }
                })
            } catch (error) {
                console.log(error)
            }

            
        })
        
    });
   
})();

