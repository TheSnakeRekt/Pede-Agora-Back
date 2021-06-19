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

    calculateDistanceInMeters = (from = {}, to = {}) =>{
        return this.getDistanceFromLatLonInKm(from.geo?.lat, from.geo?.lng, to.latitude, to.longitude);
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = Number(this.deg2rad(lat2-lat1).toFixed(15));  
        var dLon = Number(this.deg2rad(lon2-lon1).toFixed(15)); 
        var a = 
          Number((Math.sin(dLat/2) * Math.sin(dLat/2)).toFixed(15)) +
          Number(Math.cos(this.deg2rad(lat1)).toFixed(15)) * Number(Math.cos(this.deg2rad(lat2)).toFixed(15)) * 
          Number(Math.sin(dLon/2).toFixed(15)) * Number(Math.sin(dLon/2).toFixed(15))
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a).toFixed(15), Math.sqrt(1-a)).toFixed(15); 
        var d = R * c; 

        return d.toFixed(2);
    }
      

}

module.exports = new LocationFinderService(axios);