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
                       

                        for(let item of items){
                          
                            let fotoitem = fotos.items.find(foto=>foto.id == item.id);
                            let filename = fotoitem? fotoitem.filename: '';
                            const itemInstance = await db.Produto.createOrUpdate(ProdutoPopulatorDTO.mapper(item, filename));

                            for(let data of item.sizes){
                             
                                const tamanhoInstance = await db.Tamanho.createOrUpdate(TamanhoPopulatorDTO.mapper(data));

                                for(let grupo of data.groups){
                                    const groupTamanhoInstance = await db.GrupoTamanho.createOrUpdate(GrupoPopulatorDTO.mapper(grupo));

                                    for(let opcao of grupo.options){
                                        const optionInstance = await db.OpcaoGrupoTamanho.createOrUpdate(OpcaoPopulatorDTO.mapper(opcao));

                                        await groupTamanhoInstance.addOpcoes(optionInstance);
                                        await optionInstance.setGrupoTamanho(groupTamanhoInstance);
                                        await optionInstance.save();
                                    }

                                    await tamanhoInstance.addGrupoTamanho(groupTamanhoInstance);
                                   // await groupTamanhoInstance.addTamanho(tamanhoInstance);
                                    await groupTamanhoInstance.save();
                                }
                              
                               
                                await itemInstance.addTamanho(tamanhoInstance);
                                await tamanhoInstance.setProduto(itemInstance);
                            }
                            
                            for(let grupo of item.groups){
                                const groupProdutoInstance = await db.GrupoProduto.createOrUpdate(GrupoPopulatorDTO.mapper(grupo));

                                for(let opcao of grupo.options){
                                    const optionProdutoInstance = await db.OpcaoGrupoProduto.createOrUpdate(OpcaoPopulatorDTO.mapper(opcao));
                                    
                                    await groupProdutoInstance.addOpcoes(optionProdutoInstance);
                                    await optionProdutoInstance.setGrupoProduto(groupProdutoInstance);
                                    await optionProdutoInstance.save();
                                }

                                await itemInstance.addGrupoProduto(groupProdutoInstance);
                                await groupProdutoInstance.addProduto(itemInstance);
                                await groupProdutoInstance.save();
                            }
                            
                            await itemInstance.setRestaurante(restaurant);
                            await itemInstance.addCategorium(cat);
                            
                            itemInstance.setDataValue("CategoriumId",await cat.getDataValue("id"));
                            await itemInstance.save();
                           
                        }

                        for(let group of groups){
                            
                            const groupInstance = await db.Grupo.createOrUpdate(GrupoPopulatorDTO.mapper(group));
                            await cat.addGrupo(groupInstance);
                            await groupInstance.setCategorium(cat);

                            for(let option of group.options){
                                const optionInstance = await db.Opcao.createOrUpdate(OpcaoPopulatorDTO.mapper(option));
                                await groupInstance.addOpcoes(optionInstance);
                                await optionInstance.setGrupo(groupInstance);
                            }
                        }

                       
                    } catch (error) {
                        console.error(error)
                    }
                })
            } catch (error) {
                console.log(error)
            }

            
        })
        
    });
   
})();

