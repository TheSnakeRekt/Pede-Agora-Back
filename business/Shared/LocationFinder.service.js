const axios = require('axios');
const API_KEY = `AIzaSyChxZ857StRceZGKljSRQydJ0XgRXdEowA`; 
const url = `https://maps.googleapis.com/maps/api/geocode/json`;

class LocationFinderService {
    constructor(axios){
        this.axios = axios;
    }

    findGeoLoc = async (morada)=>{
        let resp = await this.axios.get(url,{
            params:{
                key:API_KEY,
                address:`${morada.rua}, ${morada.codigoPostal}, ${morada.cidade}, ${morada.pais}`
            }
        });

        return resp.data.results[0].geometry.location;
    }
}

module.exports = new LocationFinderService(axios);