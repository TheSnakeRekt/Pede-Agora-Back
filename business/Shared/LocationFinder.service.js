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
        let theta = from.longitude - to.longitude;
        let dist = Math.sin(this.toRadians(from.latitude)) * Math.sin(this.toRadians(to.latitude)) + Math.cos(this.toRadians(from.latitude)) * Math.cos(this.toRadians(to.latitude)) * Math.cos(this.toRadians(theta));
        dist = Math.acos(dist);
        let miles = dist * 60 * 1.1515;

        return Math.round(miles * 1609.344);
    }

    toRadians (angle) {
        return angle * (Math.PI / 180);
    }
}

module.exports = new LocationFinderService(axios);