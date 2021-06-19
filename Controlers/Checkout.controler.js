const checkoutControlerService = require('../Business/Checkout/Checkout.service');

class CheckoutControler {

    name = `Checkout Endpoint`;

    constructor(checkoutControlerService){
        this.checkoutControlerService = checkoutControlerService;
    }

    checkoutRestAdapter = (app) => {
        app.post('/orders/getDistance', async (req, res)=>{
            const data = await this.checkoutControlerService.distance(req.body.restaurante, req.body.morada);
            console.log(data)
            res.send(`${data}`);
            res.end()
        });
    }
}

module.exports = new CheckoutControler(checkoutControlerService);