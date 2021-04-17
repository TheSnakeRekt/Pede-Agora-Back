const API_URL = `https://www.pede-agora.com/api/cart/init`;
class REQUEST_BODY {
    restaurant_uid;
    payload = {};

    constructor(restaurant_uid){
        this.restaurant_uid = restaurant_uid;
    }
}

module.exports = {API_URL, REQUEST_BODY};